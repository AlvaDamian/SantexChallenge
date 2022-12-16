import { gql } from "@apollo/client"

export const getAllProductsQuery = gql`
  query getAllProducts {
    products {
      totalItems,
      items {
        name,
        id,
        description,
        assets {
          name,
          source,
          preview,
          width,
          height
        },
        featuredAsset {
          name,
          source,
          preview,
          width,
          height
        },
        variants {
          id,
          name,
          price,
          stockLevel
        }
      }
    }
  }
`;
