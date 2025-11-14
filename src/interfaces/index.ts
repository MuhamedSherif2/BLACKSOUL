export interface IProduct {
    id: number;
    name: string;
    slug: string;
    coverIMG: string;
    descprition: string;
    images: string[];
    prices: { name: string, price: number }[];
}

export interface ICartItem extends IProduct {
    quantity: number;
}

export interface IContext {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    selectProduct: IProduct | undefined;
    setSelectProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>>;
    cart: ICartItem[];
    setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
    addToCart: (product: IProduct) => void;
}
