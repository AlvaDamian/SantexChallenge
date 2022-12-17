import { ProductOption } from "./ProductOption";
import { ProductVariantOption } from "./ProductVariantOption";



export class ProductVariant {

  constructor(private _id: string, private _name: string, private _price: number, private _options: ProductVariantOption[]) { }

  get id() { return this._id; }
  get name() { return this._name; }
  get price() { return this._price; }
  get options() { return [...this._options]; }

  public belongsToAllOptions(allOptions: ProductOption[]): boolean {
    const thisOptionsIds = this.options.map((opt: ProductOption) => opt.id);
    return allOptions.every((opt: ProductOption) => thisOptionsIds.includes(opt.id));
  }
}
