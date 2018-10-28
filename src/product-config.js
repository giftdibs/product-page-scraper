module.exports = {
  'amazon.com': {
    'imageSelectors': [
      '#landingImage'
    ],
    'nameSelectors': [
      '#productTitle'
    ],
    'priceSelectors': [
      '#buybox .offer-price',
      '#newPrice .buyingPrice',
      '#priceblock_ourprice',
      '#priceblock_dealprice',
      '#price_inside_buybox'
    ]
  },
  'forever21.com': {
    'imageSelectors': [
      'img.product_image'
    ],
    'nameSelectors': [
      '#h1Title'
    ],
    'priceSelectors': [
      '#ItemPrice'
    ]
  },
  'kohls.com': {
    'imageSelectors': [
      'img.PDP_heroimage'
    ],
    'nameSelectors': [
      'h1.pdp-product-title'
    ],
    'priceSelectors': [
      '#pdp-Pricing .main-price'
    ]
  }
};
