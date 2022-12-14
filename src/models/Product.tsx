import Asset from "./Asset";

export class ProductVariant {

  constructor(private _id:string, private _price:number) {}
  
  get id() {return this._id;}
  get price() {return this._price;}
}

export default class Product {
  
  constructor(
    private _id:string,
    private _description:string,
    private _variants:ProductVariant[],
    private _assets:Asset[],
    private _featuredAsset:Asset
    ) { }
    
  get id() { return this._id }
  get description() {return this._description;}
  /**
   * Gets a cloned version of this product variants.
   * @returns The cloned version of this product variants.
   */
  get variants() {return [...this._variants];}
  /**
   * Gets a cloned version of this product assets.
   * @returns The cloned version of this product assets.
   */
  get assets() {return [...this._assets];}
  get featuredAsset() {return this._featuredAsset;}
}
