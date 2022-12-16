import useGetAllProducts from "../../hooks/useGetAllProducts";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import styled from 'styled-components';
import { Spinner } from "../Spinner";
import useAddProduct from "../../hooks/useAddProduct";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-evenly;
  flex-wrap: wrap
`;

export default function ProductList() {

  const {products, loading, error} = useGetAllProducts();
  

  if (error) {
    // TODO return error component
  }

  if (loading) {
    return <Spinner size="lg" marginTopInRem="2rem" marginLeftInRem="auto" marginRightInRem="auto" marginBottomInRem="1.5rem" />;
  }

  return <Container>
    {
      products.map(p => <ProductDetail key={`product-detail-${p.id}`} product={p} />)
    }
  </Container>;
}
