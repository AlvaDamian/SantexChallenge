import { faker } from "@faker-js/faker";
import { ProductOption } from "./ProductOption";


const getRandomId = () => faker.random.alphaNumeric(24);
const getRandomName = () => faker.name.jobType();

const VALID_ID = getRandomId();
const VALID_NAME = getRandomName();

const productOption = new ProductOption(VALID_ID, VALID_NAME);

describe('ProductOption model', () => {
  it('assigns properties given in the constructor', () => {
    expect(productOption.id).toEqual(VALID_ID);
    expect(productOption.name).toEqual(VALID_NAME);
  });
});
