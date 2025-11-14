import About from "../components/About";
import Products from "./Products";


const Home = () => {
    return(
        <>
        <section className='min-h-screen w-full bg-[url(/background.png)] bg-cover bg-center bg-fixed bg-no-repeat'>
            <div className="bg-[#7c7b7b56] w-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-md shadow-[#FAF0E6]">
                <h1 className="enimation text-xl md:text-6xl text-center font-bold text-white overflow-hidden"></h1>
                <h3 className="text-[15px] md:text-6xl font-bold text-white tracking-wider mt-3 text-center">SOUL IN EVERY STITCH</h3>
            </div>
        </section>
        <Products />
        <About />
        </>
    )
}

export default Home;