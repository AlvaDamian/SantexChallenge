import { faker } from "@faker-js/faker";
import Asset, { AssetType, stringToAssetType } from "./Asset";

const VALID_NAME = faker.name.fullName();
const VALID_TYPE = AssetType.IMAGE;
const VALID_MIME_TYPE = "image/png";
const VALID_SOURCE = faker.image.imageUrl();
const VALID_PREVIEW = faker.image.imageUrl();
const VALID_WIDTH = +faker.random.numeric(4);
const VALID_HEIGHT = +faker.random.numeric(4);

const asset = new Asset(
  VALID_NAME,
  VALID_TYPE,
  VALID_MIME_TYPE,
  VALID_SOURCE,
  VALID_PREVIEW,
  VALID_WIDTH,
  VALID_HEIGHT
);

describe('stringToAssetType function', () => {
  it('returns expected AssetType value based on given string', () => {
    expect(stringToAssetType("VIDEO")).toEqual(AssetType.VIDEO);
    expect(stringToAssetType("BINARY")).toEqual(AssetType.BINARY);
    expect(stringToAssetType("IMAGE")).toEqual(AssetType.IMAGE);
  });

  it('by default, returns AssetType.IMAGE', () => {
    expect(stringToAssetType("")).toEqual(AssetType.IMAGE);
    expect(stringToAssetType("     ")).toEqual(AssetType.IMAGE);
    expect(stringToAssetType("not a valid value")).toEqual(AssetType.IMAGE);
  })
});

describe('Asset model', () => {
  it("assigns expected values to properties in constructor", () => {
    expect(asset.name).toEqual(VALID_NAME);
    expect(asset.type).toEqual(VALID_TYPE);
    expect(asset.mimeType).toEqual(VALID_MIME_TYPE);
    expect(asset.source).toEqual(VALID_SOURCE);
    expect(asset.preview).toEqual(VALID_PREVIEW);
    expect(asset.width).toEqual(VALID_WIDTH);
    expect(asset.height).toEqual(VALID_HEIGHT);
  });
});
