import { useContext } from "react";
import { context } from '../components/context'
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";

const Products = () => {
    const { products, setSelectProduct } = useContext(context)

    const handleSelectProduct = (product: IProduct) => {
        setSelectProduct(product);
    }

    return (
        <section className="w-full bg-black p-7">
            <div className="container mx-auto">
                <h1 className="mb-5 text-white text-center font-bold text-xl md:text-3xl">Hoodies</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product) => (
                        <Link key={product.id} to={`/product/${product.slug}`} className="flex justify-center items-center" onClick={() => handleSelectProduct(product)}>
                        <div className="w-[200px] h-[170px] md:h-[300px] md:w-[350px] xl:w-[410px] 2xl:w-[470px] rounded-md overflow-hidden">
                            <img src={product.coverIMG} alt={product.name} className="h-[170px] md:h-[300px] w-[200px] md:w-[350px] xl:w-[410px] 2xl:w-[470px]  hover:scale-110 transition duration-300 cursor-pointer" />
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products;