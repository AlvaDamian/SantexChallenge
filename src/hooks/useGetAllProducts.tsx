import { useQuery } from "@apollo/client";
import { getAllProductsQuery } from "../graphql/queries";
import Asset, { stringToAssetType } from "../models/Asset";
import Product, { ProductVariant } from "../models/Product";

export default function useGetAllProducts() {
  const {data, loading, error} = useQuery(getAllProductsQuery);

  let products:Product[] = [];

  if (data) {
    products = data.items.map((p:any) => {
      const variants = p.variants.map((v:any) => new ProductVariant(v.id, v.price));
      const assets = p.assets.map((a:any) => new Asset(a.name, stringToAssetType(a.type), a.mimeType, a.source, a.preview));
      const featuredAsset = new Asset(p.featuredAsset.name, stringToAssetType(p.featuredAsset.type), p.featuredAsset.mimeType, p.featuredAsset.source, p.featuredAsset.preview);
      return new Product(p.id, p.description, variants, assets, featuredAsset);
    });
  }

  return {
    products,
    loading,
    error
  };
}

