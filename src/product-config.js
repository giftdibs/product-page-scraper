module.exports = {
  'amazon.com': {
    imageSelectors: [
      '#landingImage'
    ],
    nameSelectors: [
      '#productTitle'
    ],
    priceSelectors: [
      '#buybox .offer-price',
      '#newPrice .buyingPrice',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '#price_inside_buybox'
    ]
  },
  'forever21.com': {
    imageSelectors: [
      'img.product_image'
    ],
    nameSelectors: [
      '#h1Title'
    ],
    priceSelectors: [
      '#ItemPrice'
    ]
  },
  'gamestop.com': {
    imageSelectors: [
      '.boxart img'
    ],
    nameSelectors: [
      'h1.ats-prod-title'
    ],
    priceSelectors: [
      'h3.ats-prodBuy-price'
    ]
  },
  'kohls.com': {
    imageSelectors: [
      'img.PDP_heroimage'
    ],
    nameSelectors: [
      'h1.pdp-product-title'
    ],
    priceSelectors: [
      '#pdp-Pricing .main-price'
    ]
  },
  'target.com': {
    imageSelectors: [
      '[data-test="product-image"] img'
    ],
    nameSelectors: [
      '[data-test="product-title"]'
    ],
    priceSelectors: [
      'span[data-test="product-price"]'
    ]
  },
  'walmart.com': {
    imageSelectors: [
      '.product-image-carousel-container img'
    ],
    nameSelectors: [
      'h1.fashion-brand-name'
    ],
    priceSelectors: [
      'span.price-group'
    ]
  }
};
