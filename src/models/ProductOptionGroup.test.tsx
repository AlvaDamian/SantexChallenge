import { faker } from '@faker-js/faker';
import { ProductOptionGroup } from './ProductOptionGroup';
import { ProductOption } from './ProductOption';

const getRandomId = () => faker.random.alphaNumeric(24);
const getRandomName = () => faker.name.jobType();

const VALID_ID = getRandomId();
const VALID_NAME = getRandomName();

const firstOption = new ProductOption(getRandomId(), getRandomName());
const secondOption = new ProductOption(getRandomId(), getRandomName());
const thirdOption = new ProductOption(getRandomId(), getRandomName());

const options:ProductOption[] = [
  firstOption, secondOption, thirdOption
];

const optionGroup = new ProductOptionGroup(VALID_ID, VALID_NAME, options);;


describe('ProductOptionGroup model', () => {
  it('assigns properties given in the constructor', () => {
    expect(optionGroup.id).toEqual(VALID_ID);
    expect(optionGroup.name).toEqual(VALID_NAME);
    expect(optionGroup.options).toEqual(options);
  });

  it('returns a copy of options list and not the original (immutable)', () => {
    expect(optionGroup.options).not.toBe(options);
  });

  it('static findOneById returns expected ProductOptionGroup', () => {
    const optionGroupA = new ProductOptionGroup(getRandomId(), getRandomName(), options);;
    const optionGroupB = new ProductOptionGroup(getRandomId(), getRandomName(), options);;
    const optionGroupC = new ProductOptionGroup(getRandomId(), getRandomName(), options);;
    const allOptionGroups = [optionGroupA, optionGroupB, optionGroupC];

    const resultOptionGroup = ProductOptionGroup.findOneById(optionGroupB.id, allOptionGroups);
    expect(resultOptionGroup).toBe(optionGroupB);
  });
});
