export enum AssetType {
  IMAGE, VIDEO, BINARY
}

export function stringToAssetType(assetTypeString: string) {
  switch (assetTypeString) {
    case "VIDEO": return AssetType.VIDEO;
    case "BINARY": return AssetType.BINARY;
    default: return AssetType.IMAGE;
  }
}

export default class Asset {
  constructor(
    private _name:string,
    private _type:AssetType,
    private _mimeType:string,
    private _source:string,
    private _preview:string,
    private _width:number,
    private _height:number
  ) {}
  
  get name() {return this._name;}
  get type() {return this._type;}
  get mimeType() {return this._mimeType;}
  get source() {return this._source;}
  get preview() {return this._preview;}
  get width() {return this._width;}
  get height() {return this._height;}
}