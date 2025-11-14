import { useState, useEffect, createContext, type ReactNode } from "react";
import type { ICartItem, IContext, IProduct } from "../../interfaces";

// 28-usa hoodie images
import cover28USA from '/28-USA/28USA-cover.png'
import front28USA from '/28-USA/28USA-front.png'
import back28USA from '/28-USA/28USA-back.png'
import realFront28USA from '/28-USA/28USA-realFront.png'
import realBack28USA from '/28-USA/28USA-realBack.png'

// 404-error hoodie images
import cover404Error from '/404-error/redShirt.png'
import frontBoy404Error from '/404-error/redShirt-boyFront.png'
import backBoy404Error from '/404-error/redShirt-boyBack.png'
import frontGirl404Error from '/404-error/redShirt-girlFront.png'
import backGirl404Error from '/404-error/redShirt-girlBack.png'
import realFront404Error from '/404-error/redShirt-realFront.png'
import realBack404Error from '/404-error/redShirt-realBack.png'

// blacksoul hoodie images
import coverBlacksoul from '/blacksoul/blacksoul.png'
import frontBoyBlacksoul from '/blacksoul/blacksoul-boyFront.png'
import backBoyBlacksoul from '/blacksoul/blacksoul-boyBack.png'
import frontGirlBlacksoul from '/blacksoul/blacksoul-girlFront.png'
import backGirlBlacksoul from '/blacksoul/blacksoul-girlBack.png'
import realFrontBlacksoul from '/blacksoul/blacksoul-realFront.png'
import realBackBlacksoul from '/blacksoul/blacksoul-realBack.png'

export const context = createContext<IContext>({
    products: [],
    setProducts: () => {},
    selectProduct: undefined,
    setSelectProduct: () => {},
    cart: [],
    setCart: () => {},
    addToCart: () => {}
});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [selectProduct, setSelectProduct] = useState<IProduct | undefined>(undefined);
    const [cart, setCart] = useState<ICartItem[]>([])

    const closes: IProduct[] = [
        {
            id: 1,
            name: '404 Error Hoodie',
            slug: '404-Error',
            coverIMG: cover404Error,
            descprition:'This unique black hoodie features a distinctive "ERROR 404" graphic on the back, playing on the classic web page not found message. The design includes "ERROR" in red, followed by a large, bold "404" also in red. Below it, the phrase "HUMAN NOT FOUND" is displayed, adding a clever and slightly humorous twist. Further down, in a smaller font, it reads "SORRY! THE HUMAN YOU ARE LOOKING FOR DOES NOT EXIST." This hoodie offers a relaxed fit and a comfortable hood, making it a perfect choice for those who appreciate witty, internet-culture-inspired fashion.',
            images: [cover404Error, frontBoy404Error, backBoy404Error, frontGirl404Error, backGirl404Error, realFront404Error, realBack404Error],
            prices: [
                { name: 'del', price: 700 },
                { name: 'real', price: 600 }
            ]
        },
        {
            id: 2,
            name: '28 USA Hoodie',
            slug: '28-usa',
            coverIMG: cover28USA,
            descprition:"This stylish black hoodie features a prominent collegiate-inspired design. The front showcases a large pink number '28' with a textured, dotted pattern, outlined in white. Above the '28' on the left, there's an emblem with 'MASSACHUSETTS' and 'U.S.A.' below it, surrounded by a laurel wreath design. On the right, a pink 'N' is displayed with a small light blue star and the word 'LEGENDARY' underneath. The hoodie has a classic pouch pocket at the front and a comfortable drawstring hood, combining a sporty aesthetic with a casual fit.",
            images: [cover28USA, front28USA, back28USA, realFront28USA, realBack28USA],
            prices: [
                { name: 'del', price: 700 },
                { name: 'real', price: 600 }
            ]
        },
        {
            id: 3,
            name: 'BLACKSOUL Hoodie',
            slug: 'BLACKSOUL',
            coverIMG: coverBlacksoul,
            descprition:'This sleek black hoodie features a minimalist yet striking design with the brand name "BLACKSOUL" emblazoned across the chest. The lettering is presented in a unique, slightly wavy and reflective white or light grey font, giving it a modern and dynamic feel against the dark fabric. The hoodie boasts a classic, relaxed fit with a spacious front pouch pocket and a comfortable hood. Its an ideal choice for those who appreciate understated style with a touch of contemporary flair.',
            images: [coverBlacksoul, frontBoyBlacksoul, backBoyBlacksoul, frontGirlBlacksoul, backGirlBlacksoul, realFrontBlacksoul, realBackBlacksoul],
            prices: [
                { name: 'del', price: 700 },
                { name: 'real', price: 600 }
            ]
        },
    ]

    
    useEffect(() => {
        setProducts(closes);
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    const addToCart = (product: IProduct) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.id === product.id);

            let updated: ICartItem[];

            if (exists) {
                updated = prev.map((i) =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                updated = [...prev, { ...product, quantity: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <context.Provider value={{
            products,
            setProducts,
            selectProduct,
            setSelectProduct,
            cart,
            setCart,
            addToCart
        }}>
            {children}
        </context.Provider>
    );
}