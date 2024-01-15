import React from 'react'
import { ShoppingCartSimple, BookBookmark } from '@phosphor-icons/react'
import Vite from '../assets/vite.svg'
import { useSelector } from 'react-redux'
import { selectCartTotalItems } from '../features/cart/cartSlice'
import { selectWhistTotalItems } from '../features/whistlist/whistlistSlice'

const Header = ({ handleOpenModalCart, handleOpenModalWhistlist }) => {

    const cartTotalItems = useSelector(selectCartTotalItems)
    const whistTotalItems = useSelector(selectWhistTotalItems)

    return (
        <header className='bg-gray-800'>
            <div className='max-w-7xl mx-auto px-10 max-sm:px-4'>
                <div className='flex items-center justify-between h-20 '>
                    <div className='group relative  w-auto max-sm:w-3/5 '>
                        <div
                            className='flex justify-between cursor-pointer
                                group-hover:scale-110 duration-75
                                max-sm:group-hover:scale-100
                                max-sm:justify-between'
                        >
                            <img src={Vite} alt="vite" className='w-8 h-8 mr-2 max-sm:hover:scale-110' />
                            <h1 className='text-xl font-bold text-gray-100'> VShop </h1>
                        </div>
                    </div>
                    <div className='flex justify-end w-1/4  gap-2 '>
                        <button
                            type='button'
                            className='relative rounded-full p-2 text-gray-100 '
                            onClick={handleOpenModalWhistlist}
                        >
                            {
                                whistTotalItems !== 0 ? (
                                    <span className='absolute top-0 right-0 w-5 h-5 rounded-full bg-red-500 border-4 border-gray-800 text-white text-xs font-bold flex justify-center items-center'></span>
                                ) : (
                                    null
                                )
                            }
                            <BookBookmark size={28} weight="bold" />
                        </button>
                        <button
                            type='button'
                            className='relative rounded-full p-2 text-gray-100'
                            onClick={handleOpenModalCart}
                        >
                            {
                                cartTotalItems !== 0 ? (
                                    <span className='absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-500 border-4 border-gray-800 text-white text-xs font-bold flex justify-center items-center'>
                                        {cartTotalItems}
                                    </span>
                                ) : (
                                    null
                                )
                            }
                            <ShoppingCartSimple size={28} weight="bold" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header