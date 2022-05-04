const matchProducts = require('../src/matchProducts');
const mockProducts = require('../mocks/products.json');

it('should return products matching search keywards', () => {
  const singleMatchedProducts = matchProducts(mockProducts, ['Hermes document']);
  expect(singleMatchedProducts.length).toBe(1);
  expect(singleMatchedProducts).toEqual([
    {
      name: 'Multiplis Hermes document holder',
      link: 'https://www.hermes.com/us/en/product/multiplis-hermes-document-holder-H075136CAAA/',
    },
  ]);

  const multiMatchedProducts = matchProducts(mockProducts, ['Hermes document ', 'Maillons bag']);
  expect(multiMatchedProducts.length).toBe(2);
  expect(multiMatchedProducts).toEqual([
    {
      name: 'Multiplis Hermes document holder',
      link: 'https://www.hermes.com/us/en/product/multiplis-hermes-document-holder-H075136CAAA/',
    },
    {
      "name": "Maillons bag strap",
      "link": "https://www.hermes.com/us/en/product/maillons-bag-strap-H082218CKAB092/"
    }
  ]);
});
