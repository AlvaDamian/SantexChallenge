import { ProductOption } from "./ProductOption";
import { ProductOptionGroup } from "./ProductOptionGroup";



export class ProductVariantOption extends ProductOption {

  constructor(id: string, name: string, private _optionGroup: ProductOptionGroup | undefined) {
    super(id, name);
  }

  get optionGroup() { return this._optionGroup; }
}
