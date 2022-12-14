import useGetAllProducts from "../../hooks/useGetAllProducts";
import { ProductDetail } from "../ProductDetail/ProductDetail";

export default function ProductList() {

  const {products, loading, error} = useGetAllProducts();

  if (error) {
    // TODO return error component
  }

  if (loading) {
    // TODO return spinner
  }

  return <div>
    {
      products.map(p => <ProductDetail key={`product-detail-${p.id}`} product={p} />)
    }
  </div>;
}
