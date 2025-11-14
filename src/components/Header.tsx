import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { context } from './context';

interface IProp {
    className: string
}

const ShoppingBagIcon = ({ className }: IProp) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.5 2.362 10.514c.125.549-.336 1.053-.865 1.053H3.084c-.529 0-.99-.504-.865-1.053L4.394 9h15.212Z" />
  </svg>
);

const MenuIcon = ({ className } : IProp) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = ({ className } : IProp) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { cart } = useContext(context);

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className='w-full bg-black shadow-xl fixed top-0 z-50 backdrop-blur-sm bg-opacity-95'>
      <div className='container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center h-16'>
        
        <div className='text-white text-[12px] sm:text-2xl font-extrabold tracking-widest cursor-pointer'>
          BLACKSOUL
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8 text-lg font-medium'>
          <Link to={'/'} className='text-gray-300 hover:text-white transition-colors'>Home</Link>

          {/* Desktop Cart */}
          <Link to={'/cart'} className='relative text-gray-300 hover:text-white transition-colors p-1'>
            <ShoppingBagIcon className='w-5 h-5 sm:w-7 sm:h-7' />
            {cartQuantity > 0 && (
              <span 
                className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#00FF88] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-gray-900 shadow-md'
              >
                {cartQuantity}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Cart + Menu Button */}
        <div className='md:hidden flex items-center space-x-4'>

          {/* Cart icon mobile */}
          <Link to={'/cart'} className='relative text-gray-300 hover:text-white transition-colors p-1'>
            <ShoppingBagIcon className='w-5 h-5 sm:w-7 sm:h-7' />
            {cartQuantity > 0 && (
              <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#00FF88] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-gray-900'>
                {cartQuantity}
              </span>
            )}
          </Link>

          {/* Menu button */}
          <button onClick={() => setToggle(!toggle)} className='text-white p-2 focus:outline-none'>
            {toggle ? <CloseIcon className='w-5 h-5 sm:w-7 sm:h-7' /> : <MenuIcon className='w-5 h-5 sm:w-7 sm:h-7' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-black absolute w-full transition-all duration-300 ease-in-out ${
          toggle ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className='flex flex-col items-center space-y-3 font-medium'>
          <Link 
            onClick={() => setToggle(false)} 
            to={'/'} 
            className='text-gray-300 hover:text-white w-full text-center py-2'
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
