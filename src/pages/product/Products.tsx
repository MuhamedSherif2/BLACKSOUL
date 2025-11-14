import { useContext } from "react";
import { context } from '../../components/context'
import { Link } from "react-router-dom";
import type { IProduct } from "../../interfaces";

interface IProductsProps {
  fullHeight?: boolean;
  limit?: number;   
}

const Products = ({ fullHeight = false, limit }: IProductsProps) => {
  const { products, setSelectProduct } = useContext(context)

  const handleSelectProduct = (product: IProduct) => {
    setSelectProduct(product);
  }

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className={`w-full bg-black ${fullHeight ? 'py-10' : 'p-7'}`}>
      <div className="container mx-auto">
        <h1 className="mb-5 text-white text-center font-bold text-xl md:text-3xl">
          Hoodies
        </h1>
        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5`}>
          {displayProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.slug}`} 
              className="flex justify-center items-center"
              onClick={() => handleSelectProduct(product)}
            >
              <div className={`
                w-[200px] md:w-[350px] xl:w-[410px] 2xl:w-[470px] 
                rounded-md overflow-hidden
                ${fullHeight ? 'h-[calc(100vh-150px)] md:h-[500px]' : 'h-[170px] md:h-[300px]'}
              `}>
                <img 
                  src={product.coverIMG} 
                  alt={product.name} 
                  className="h-full w-full hover:scale-110 transition duration-300 cursor-pointer object-cover" 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products;
