import { useContext } from "react"
import { context } from "../components/context"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const { products } = useContext(context)
  const { slug } = useParams()
  const filteredProduct = products.find((product) => product.slug === slug)

  if (!filteredProduct) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>
  }

  return (
    <section className="pt-10">
      <div className="container mx-auto">
        <img
          src={filteredProduct.coverIMG}
          alt={filteredProduct.name}
          className="w-full h-full object-cover"
        />
        <h1 className="text-4xl font-bold mt-4">{filteredProduct.name}</h1>
        <p className="text-gray-500 mt-2">Price: {filteredProduct.prices[0].price} EGP</p>
      </div>
    </section>
  )
}

export default ProductDetails
