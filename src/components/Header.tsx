import logo from '/black soul png.png'

const Header = () => {
    return(
        <header className='w-full bg-black fixed z-50'>
            <div className='container mx-auto py-3'>
                <img src={logo} alt="logo-BLACKSOUL" className='w-30 h-10' />
            </div>
        </header>
    )
}

export default Header;