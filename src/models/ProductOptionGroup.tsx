import { ProductOption } from "./ProductOption";



export class ProductOptionGroup {
  constructor(private _id: string, private _name: string, private _options: ProductOption[]) { }

  get id() { return this._id; }
  get name() { return this._name; }
  get options() { return this._options; }

  public static findOneById(id: string, optionGroupsList: ProductOptionGroup[]): ProductOptionGroup {
    return optionGroupsList.find(optionGroup => optionGroup.id === id)!;
  }
}
