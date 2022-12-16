import { useQuery } from "@apollo/client";
import { getAllProductsQuery } from "../graphql/queries";
import Asset, { stringToAssetType } from "../models/Asset";
import Product, { ProductVariant } from "../models/Product";

const createAssetFromResponse = (assetDataFromServer:any) => {
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
    products = data.products.items.map((p:any) => {
      const variants = p.variants.map((v:any) => new ProductVariant(v.id, v.price));
      const assets = p.assets.map(createAssetFromResponse);
      let featuredAsset:Asset|null = null;
      if (p.featuredAsset) {
        featuredAsset = createAssetFromResponse(p.featuredAsset);
      }
      
      return new Product(p.id, p.name, p.description, variants, assets, featuredAsset);
    });
  }

  return {
    products,
    loading,
    error
  };
}

