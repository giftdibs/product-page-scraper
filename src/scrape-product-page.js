/* eslint-env browser */

module.exports = function scrapeProductPage(config) {
  const isUrlRegExp = /^https?:\/\//;

  const isAcceptedType = (url) => {
    return (
      url.indexOf('.png') === -1 &&
      url.indexOf('.gif') === -1
    );
  };

  const findElement = (selectors) => {
    if (!selectors || !selectors.length) {
      return;
    }

    for (let i = 0, len = selectors.length; i < len; i++) {
      const selector = selectors[i];
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
    }

    return false;
  }

  const findElements = (selectors) => {
    if (!selectors || !selectors.length) {
      return;
    }

    const elements = document.querySelectorAll(selectors.join(', '));

    return elements;
  }

  // Convert URls to data URLs.
  // https://stackoverflow.com/a/20285053/6178885
  const toDataUrl = (url) => {
    return new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  const nameElement = findElement(config.nameSelectors);
  const priceElement = findElement(config.priceSelectors);

  let name = '';
  if (nameElement) {
    name = nameElement.textContent.trim().replace(/\t/g, ' ');
  }

  let price = 0;
  if (priceElement) {
    price = priceElement.textContent.trim().replace('$', '').replace(/ /g, '');
    price = parseFloat(price);
    price = Math.round(price);

    if (isNaN(price)) {
      price = 0;
    }
  }

  // Fallback to finding any images if the special selector fails.
  let imageElements = findElements(config.imageSelectors);
  if (!imageElements || imageElements.length === 0) {
    imageElements = document.querySelectorAll('img');
  }

  let images = [];

  imageElements.forEach((element) => {
    const src = element.src;

    if (src) {
      const isValidUrl = (
        isAcceptedType(src) &&
        (
          isUrlRegExp.test(src) ||
          src.indexOf('data:image') === 0
        )
      );

      if (!isValidUrl) {
        return;
      }

      // Don't include duplicates.
      const found = images.find(img => img.url === src);
      if (found) {
        return;
      }

      const height = Math.round(element.naturalHeight);
      const width = Math.round(element.naturalWidth);

      if (height < 150 || width < 150) {
        return;
      }

      images.push({
        url: src,
        height,
        width
      });
    }
  });

  // Limit number of images saved.
  if (images.length > 25) {
    images = images.slice(0, 24);
  }

  const promises = images.map(async (image) => {
    if (image.url.indexOf('data:image') === 0) {
      return image;
    }

    image.dataUrl = await toDataUrl(image.url);

    return image;
  });

  return Promise.all(promises)
    .then((result) => {
      return {
        images: result,
        name,
        price
      };
    });
};
