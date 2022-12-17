import { useQuery } from "@apollo/client";
import { getAllProductsQuery } from "../graphql/queries";
import Asset, { stringToAssetType } from "../models/Asset";
import Product from "../models/Product";
import { ProductVariant } from "../models/ProductVariant";
import { ProductVariantOption } from "../models/ProductVariantOption";
import { ProductOption } from "../models/ProductOption";
import { ProductOptionGroup } from "../models/ProductOptionGroup";

const createAssetFromResponse = (assetDataFromServer?:any) => {

  if (assetDataFromServer == null) {
    return null;
  }

  const {
    name,
    type,
    mimeType,
    source,
    preview,
    width,
    height
  } = assetDataFromServer;

  return new Asset(name, stringToAssetType(type), mimeType, source, preview, width, height);
}

export default function useGetAllProducts() {
  const {data, loading, error} = useQuery(getAllProductsQuery);

  let products:Product[] = [];

  if (data) {
    products = data.products.items.map((item:any) => {
      const optionGroups = item.optionGroups.map((optionGroup:any) => {
        const options = optionGroup.options.map((option:any) => new ProductOption(option.id, option.name));
        return new ProductOptionGroup(optionGroup.id, optionGroup.name, options);
      });
      const variants = item.variants.map((variant:any) => {

        const options = variant.options.map((option:any) => new ProductVariantOption(option.id, option.name, ProductOptionGroup.findOneById(option.groupId, optionGroups)));
        return new ProductVariant(variant.id, variant.name, variant.price, options);
      });
      const assets = item.assets.map(createAssetFromResponse);
      let featuredAsset:Asset|null = null;
      if (item.featuredAsset) {
        featuredAsset = createAssetFromResponse(item.featuredAsset);
      }
      
      return new Product(item.id, item.name, item.description, variants, optionGroups, assets, featuredAsset);
    });
  }

  return {
    products,
    loading,
    error
  };
}

