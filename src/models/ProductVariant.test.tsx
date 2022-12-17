import { faker } from "@faker-js/faker";
import { ProductOption } from "./ProductOption";
import { ProductOptionGroup } from "./ProductOptionGroup";
import { ProductVariant } from "./ProductVariant";
import { ProductVariantOption } from './ProductVariantOption';

const getRandomId = () => faker.random.alphaNumeric(24);
const getRandomName = () => faker.name.fullName();

const VALID_ID = getRandomId();
const VALID_NAME = getRandomName();
const VALID_PRICE = +faker.random.numeric(7);

const firstOption = new ProductOption(getRandomId(), getRandomName());
const secondOption = new ProductOption(getRandomId(), getRandomName());
const thirdOption = new ProductOption(getRandomId(), getRandomName());

const options:ProductOption[] = [ firstOption, secondOption, thirdOption ];

const optionGroup = new ProductOptionGroup(getRandomId(), getRandomName(), options);
const productVariantOption = new ProductVariantOption(getRandomId(), getRandomName(), optionGroup);
const productVariantOptionsList = [productVariantOption];
const variant = new ProductVariant(VALID_ID, VALID_NAME, VALID_PRICE, productVariantOptionsList);


const notSetProductVariantOption = new ProductVariantOption(getRandomId(), getRandomName(), optionGroup);
const notSetVariantOptionsList = [notSetProductVariantOption];

describe('ProductVariant model', () => {
  it('assigns properties with provided values in constructor', () => {
    expect(variant.id).toEqual(VALID_ID);
    expect(variant.name).toEqual(VALID_NAME);
    expect(variant.price).toEqual(VALID_PRICE);
    expect(variant.options).toEqual(productVariantOptionsList);
  });

  it('options returns a copy of the list (immutable)', () => {
    expect(variant.options).not.toBe(productVariantOptionsList);
  });

  describe('belongsToAllOptions', () => {
    it('returns true if all the provided options were set to the variant', () => {
      let result = variant.belongsToAllOptions(productVariantOptionsList);
      expect(result).toBeTruthy();
      result = variant.belongsToAllOptions([]);
      expect(result).toBeTruthy();
    });

    it('returns false if any the provided options was not set to the variant', () => {
      let result = variant.belongsToAllOptions(notSetVariantOptionsList);
      expect(result).toBeFalsy();
    });

    it('does not modify any property', () => {
      variant.belongsToAllOptions(productVariantOptionsList);
      expect(variant.id).toEqual(VALID_ID);
      expect(variant.name).toEqual(VALID_NAME);
      expect(variant.price).toEqual(VALID_PRICE);
      expect(variant.options).toEqual(productVariantOptionsList);
    });
  });
});