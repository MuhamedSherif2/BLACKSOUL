export interface IProduct{
    id: number,
    name:string,
    slug:string,
    coverIMG: string,
    images: string[],
    prices: {name: string, price:number}[]
}

export interface IContext {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    selectProduct: IProduct | undefined;
    setSelectProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
  }