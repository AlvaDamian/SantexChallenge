import Asset from "./Asset";


export class ProductOptionGroup {
  constructor(private _id:string, private _name:string, private _options:ProductOption[]) {}
  
  get id() {return this._id;}
  get name() {return this._name;}
  get options() {return this._options;}

  public static findOneById(id:string, optionGroupsList:ProductOptionGroup[]):ProductOptionGroup {
    return optionGroupsList.find(optionGroup => optionGroup.id === id)!;
  }
}

export class ProductOption {
  constructor(private _id:string, private _name:string) {}

  get id() {return this._id;}
  get name() {return this._name;}
}

export class ProductVariantOption extends ProductOption {

  constructor(id:string, name:string, private _optionGroup:ProductOptionGroup | undefined) {
    super(id, name);
  }

  get optionGroup() {return this._optionGroup;}
}

export class ProductVariant {

  constructor(private _id:string, private _name:string, private _price:number, private _options:ProductVariantOption[]) {}
  
  get id() {return this._id;}
  get name() {return this._name}
  get price() {return this._price;}
  get options() {return this._options;}

  public belongsToAllOptions(allOptions:ProductOption[]):boolean {
    const thisOptionsIds = this.options.map((opt:ProductOption) => opt.id);
    return allOptions.every((opt:ProductOption) => thisOptionsIds.includes(opt.id));
  }
}

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
  get optionGroups() { return this._optionGroups; }

  public getFirstVariantOptionGroups():ProductOptionGroup[] {
    if (this.variants.length === 0) {
      return [];
    }

    const firstVariant = this.variants[0];
    return firstVariant.options.map((option:ProductOption) => {
      return this.optionGroups.find((optionGroup:ProductOptionGroup) => optionGroup.options.some((opt:ProductOption) => opt.id === option.id))!;
    });
  }

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
