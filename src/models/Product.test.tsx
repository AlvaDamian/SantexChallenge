import { faker } from "@faker-js/faker";
import Asset from "./Asset";
import Product from "./Product";
import { ProductOption } from "./ProductOption";
import { ProductOptionGroup } from "./ProductOptionGroup";
import { ProductVariant } from "./ProductVariant";
import { ProductVariantOption } from "./ProductVariantOption";

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

const notSetProductOption = new ProductOption(getRandomId(), getRandomName());

describe('Product model', () => {
  describe('Initialization', () => {
    it('Assigns to properties provided values on construction', () => {
      expect(product.id).toEqual(VALID_ID);
      expect(product.name).toEqual(VALID_NAME);      
      expect(product.description).toEqual(VALID_DESCRIPTION);
      expect(product.variants).toEqual(variantsList);
      expect(product.assets).toEqual(assetsList);
      expect(product.featuredAsset).toBeNull();
      expect(product.optionGroups).toEqual(optionGroupsList);
    });
  });

  describe('variants getter', () => {
    it('returns a copy or variants list (immutable)', () => {
      expect(product.variants).not.toBe(variantsList);
    });
  });

  describe('optionGroups getter', () => {
    it('returns a copy of option groups list (immutable)', () => {
      expect(product.optionGroups).not.toBe(optionGroupsList);
    });
  });

  describe('assets getter', () => {
    it('returns a copy of assets list (immutable)', () => {
      expect(product.assets).not.toBe(assetsList);
    });
  });

  describe('getVariantWithNewOption method', () => {
    it('if the variant exists, returns the one that has the same options.', () => {
      const resultVariant = product.getVariantWithNewOption(variant, variant.options[0]);
      expect(resultVariant).toBe(variant);
    });

    it('if the variant does not exist, returns undefined', () => {
      const resultVariant = product.getVariantWithNewOption(variant, notSetProductOption);
      expect(resultVariant).toBeUndefined();
    })

    it('does not modify any property', () => {
      product.getVariantWithNewOption(variant, firstOption);
      expect(product.id).toEqual(VALID_ID);
      expect(product.name).toEqual(VALID_NAME);      
      expect(product.description).toEqual(VALID_DESCRIPTION);
      expect(product.variants).toEqual(variantsList);
      expect(product.assets).toEqual(assetsList);
      expect(product.featuredAsset).toBeNull();
      expect(product.optionGroups).toEqual(optionGroupsList);
    });
  });
});