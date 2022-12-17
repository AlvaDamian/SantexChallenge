import Asset from "./Asset";
import { ProductOption } from "./ProductOption";
import { ProductOptionGroup } from "./ProductOptionGroup";
import { ProductVariant } from "./ProductVariant";
import { ProductVariantOption } from "./ProductVariantOption";


export default class Product {
  
  constructor(
    private _id:string,
    private _name:string,
    private _description:string,
    private _variants:ProductVariant[],
    private _optionGroups:ProductOptionGroup[],
    private _assets:Asset[],
    private _featuredAsset:Asset|null
    ) { }
    
  get id() { return this._id; }
  get name() { return this._name; }
  get description() {return this._description; }
  /**
   * Gets a cloned version of this product variants.
   * @returns The cloned version of this product variants.
   */
  get variants() { return [...this._variants]; }
  /**
   * Gets a cloned version of this product assets.
   * @returns The cloned version of this product assets.
   */
  get assets() { return [...this._assets]; }
  get featuredAsset() { return this._featuredAsset; }
  get optionGroups() { return [...this._optionGroups]; }

  public getVariantWithNewOption(referenceVariant:ProductVariant, newOption:ProductOption):ProductVariant | undefined {
    const optionGroup = this.getOptionGroupFromOption(newOption);
    const otherOptions:ProductOption[] = referenceVariant.options.filter((option:ProductVariantOption) => option.optionGroup?.id !== optionGroup?.id);
    const allOptions = [...otherOptions, newOption];
    return this.variants.find((variant:ProductVariant) => variant.belongsToAllOptions(allOptions));
  }

  private getOptionGroupFromOption(option:ProductOption):ProductOptionGroup | undefined {
    return this.optionGroups.find((optionGroup:ProductOptionGroup) => optionGroup.options.some((opt:ProductOption) => opt.id === option.id));
  }
}
