import { MockedProvider } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';
import Asset from '../../models/Asset';
import Product from '../../models/Product';
import { ProductOption } from '../../models/ProductOption';
import { ProductOptionGroup } from '../../models/ProductOptionGroup';
import { ProductVariant } from '../../models/ProductVariant';
import { ProductVariantOption } from '../../models/ProductVariantOption';
import { ProductDetail } from './ProductDetail';

const getRandomId = () => faker.random.alphaNumeric(24);
const getRandomName = () => faker.name.fullName();

const VALID_ID = getRandomId();
const VALID_NAME = getRandomName();
const VALID_DESCRIPTION = getRandomName();
const VALID_PRICE = +faker.random.numeric(7);

const firstOption = new ProductOption(getRandomId(), getRandomName());
const secondOption = new ProductOption(getRandomId(), getRandomName());
const thirdOption = new ProductOption(getRandomId(), getRandomName());

const options:ProductOption[] = [ firstOption, secondOption, thirdOption ];

const optionGroup = new ProductOptionGroup(getRandomId(), getRandomName(), options);
const productVariantOption = new ProductVariantOption(getRandomId(), getRandomName(), optionGroup);
const productVariantOptionsList = [productVariantOption];

const variant = new ProductVariant(getRandomId(), getRandomName(), VALID_PRICE, productVariantOptionsList);
const variantsList = [variant];

const optionGroupsList = [optionGroup];

const assetsList:Asset[] = [];
const product = new Product(VALID_ID, VALID_NAME, VALID_DESCRIPTION, variantsList, optionGroupsList, assetsList, null)

describe('ProductDetail component', () => {
  it('renders product name once', async () => {
    const renderResult = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductDetail product={product} />
      </MockedProvider>
    );

    const elements = await renderResult.findAllByText(product.name);
    expect(elements.length).toEqual(1);
  });

  it('renders description once', async () => {
    const renderResult = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductDetail product={product} />
      </MockedProvider>
    );

    const elements = await renderResult.findAllByText(product.description);
    expect(elements.length).toEqual(1);
  });

  it('renders a label for each product option group', async () => {
    const renderResult = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductDetail product={product} />
      </MockedProvider>
    );

    for (let i in optionGroupsList) {
      const optGroup = optionGroupsList[i];
      const elements = await renderResult.findAllByText(optGroup.name);
      expect(elements.length).toEqual(1);
    }
  });

  it('renders the price of the active variant', async () => {
    const renderResult = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductDetail product={product} />
      </MockedProvider>
    );

    const elements = await renderResult.findAllByText(`$ ${variant.price}`);
    expect(elements.length).toEqual(1);
  });
});