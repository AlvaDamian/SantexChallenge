import { faker } from "@faker-js/faker";
import { ProductOption } from "./ProductOption";
import { ProductOptionGroup } from "./ProductOptionGroup";
import { ProductVariantOption } from "./ProductVariantOption";

const getRandomId = () => faker.random.alphaNumeric(24);
const getRandomName = () => faker.name.fullName();

const VALID_ID = getRandomId();
const VALID_NAME = getRandomName();

const PRODUCT_OPTION_ID = getRandomId();
const PRODUCT_OPTION_NAME = getRandomName();

const firstOption = new ProductOption(getRandomId(), getRandomName());
const secondOption = new ProductOption(getRandomId(), getRandomName());
const thirdOption = new ProductOption(getRandomId(), getRandomName());

const options:ProductOption[] = [ firstOption, secondOption, thirdOption ];

const optionGroup = new ProductOptionGroup(PRODUCT_OPTION_ID, PRODUCT_OPTION_NAME, options);
const productVariantOption = new ProductVariantOption(VALID_ID, VALID_NAME, optionGroup);

describe('ProductVariantOption model', () => {
  it('assigns properties with values provided in constructor', () => {
    expect(productVariantOption.id).toEqual(VALID_ID);
    expect(productVariantOption.name).toEqual(VALID_NAME);
    expect(productVariantOption.optionGroup).toEqual(optionGroup);
  });

  it('returned ProductOptionGroup is a copy of the provided object (immutable)', () => {
    expect(productVariantOption.optionGroup).not.toBe(optionGroup);
  });
});