/* eslint-env browser */

module.exports = function scrapeProductPage(config) {
  const isUrlRegExp = /^https?:\/\//;

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

  // Convert URls to data URLS.
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
    name = nameElement.textContent.trim();
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

  // Fall back to all images if the special selector fails.
  let imageElements = findElements(config.imageSelectors);
  if (!imageElements || imageElements.length === 0) {
    imageElements = document.querySelectorAll('img');
  }

  let images = [];

  imageElements.forEach((element) => {
    const src = element.src;

    if (src) {
      const isValidUrl = (isUrlRegExp.test(src) || src.indexOf('data:image') === 0);
      if (isValidUrl) {
        const rect = element.getBoundingClientRect();
        if (
          (rect.width >= 200 && rect.height >= 50) ||
          (rect.height >= 200 && rect.width >= 50)
        ) {
          images.push({
            url: src,
            height: Math.round(rect.height),
            width: Math.round(rect.width)
          });
        }
      }
    }
  });

  // Limit number of images saved.
  if (images.length > 25) {
    images = images.slice(0, 24);
  }

  return new Promise((resolve) => {
    const numImages = images.length;
    const result = {
      images: [],
      name,
      price
    };

    let numPromisesResolved = 0;

    images.forEach((image) => {
      if (image.url.indexOf('data:image') === 0) {
        return image;
      }

      toDataUrl(image.url).then((dataUrl) => {
        numPromisesResolved++;
        image.dataUrl = dataUrl;
        delete image.url;

        if (numPromisesResolved === numImages) {
          result.images = images;
          resolve(result);
        }
      });
    });
  });
};
