import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IContext, IProduct } from "../../interfaces";

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
});
export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<IProduct[]>([])

    const closes : IProduct[] = [
        {
            id: 1,
            name:'28 USA Hoodie',
            slug:'28-usa',
            coverIMG: cover28USA,
            images:[cover28USA, front28USA, back28USA, realFront28USA, realBack28USA],
            prices:[
                {name: 'del', price:700},
                {name: 'real', price:600}
            ]
        },
        {
            id: 2,
            name:'404 Error Hoodie',
            slug:'404-Error',
            coverIMG: cover404Error,
            images:[cover404Error, frontBoy404Error, backBoy404Error, frontGirl404Error, backGirl404Error, realFront404Error, realBack404Error],
            prices:[
                {name: 'del', price:700},
                {name: 'real', price:600}
            ]
        },
        {
            id: 3,
            name:'BLACKSOUL Hoodie',
            slug:'BLACKSOUL',
            coverIMG: coverBlacksoul,
            images:[coverBlacksoul, frontBoyBlacksoul, backBoyBlacksoul, frontGirlBlacksoul, backGirlBlacksoul, realFrontBlacksoul, realBackBlacksoul],
            prices:[
                {name: 'del', price:700},
                {name: 'real', price:600}
            ]
        },
    ]

    useEffect(() => {
        setProducts(closes);
    }, [])

    return(
        <context.Provider value={{
            products,
            setProducts
        }}>
            {children}
        </context.Provider>
    )
}