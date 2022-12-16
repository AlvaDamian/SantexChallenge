import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import { addProductMutation } from "../graphql/mutations";

interface UseAddProductReturnType {
  loading: boolean,
  error: string | undefined,
  addProduct: (productVariantId:string, quantity:number) => void
}

export default function useAddProduct():UseAddProductReturnType {
  const [addProductFromMutation, {data, error, loading}] = useMutation(addProductMutation);

  const addProduct = useCallback((productVariantId:string, quantity:number) => {
    addProductFromMutation({
      variables: {
        "productVariantId": productVariantId,
        "quantity": quantity
      }
    });
  }, [addProductFromMutation]);

  let errorMessage: string | undefined;
  if (data) {
    if (data.OrderModificationError || data.OrderLimitError || data.NegativeQuantityError || data.InsufficientStockError) {
      errorMessage = data.message;
    } else {
      // TODO send a success.
    }
  } else if (error) {
    errorMessage = error.message;
  }

  return {
    loading,
    error: errorMessage,
    addProduct
  }
}
