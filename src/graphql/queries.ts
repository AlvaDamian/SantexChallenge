import { gql } from "@apollo/client"

export const getAllProductsQuery = gql`
  query getAllProducts {
    products {
      picture,
      description,
      variants {
        id,
        name,
        price
      }
    }
  }
`;
