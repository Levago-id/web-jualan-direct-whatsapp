import React, { useEffect, useState } from 'react';
import 'ldrs/ring'
import NoBox from '../../assets/cart.png'
import { useSelector, useDispatch } from 'react-redux';
import { addItemToWhistlist, selectWhistItems } from '../whistlist/whistlistSlice';
import { MagnifyingGlass, X, Faders, Star, ShoppingCart, HeartStraight } from '@phosphor-icons/react';
import { capitalizeFirstLetter } from '../../utility/utils';
import { selectFilter } from '../filter/filterSlice';

const ProductList = ({ handleOpenModalFilter, handleOpenModalDetail, handleProductClick }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const whistItems = useSelector(selectWhistItems);
    const selectedFilter = useSelector(selectFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchingProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchingProducts();
    }, []);

    const indexProduct = [...new Set(whistItems.map(product => product.title))];
    const filteredProducts =
        selectedCategory !== 'All' ? products.filter(product => product.category === selectedCategory) : products;

    const sortProducts = (products, filterCriteria) => {
        switch (filterCriteria) {
            case 'Highest':
                return [...products].sort((a, b) => b.price - a.price);
            case 'Lowest':
                return [...products].sort((a, b) => a.price - b.price);
            case 'A-Z':
                return [...products].sort((a, b) => a.title.localeCompare(b.title));
            case 'Z-A':
                return [...products].sort((a, b) => b.title.localeCompare(a.title));
            default:
                return products;
        }
    };

    const filteredAndSortedProducts = sortProducts(filteredProducts, selectedFilter);


    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        const searchTerm = searchValue.toLowerCase();
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();

            const filteredResults = sortProducts(
                data.filter((product) => {
                    const matchesCategory = category === 'All' || product.category === category;
                    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm);
                    return matchesCategory && matchesSearchTerm;
                }),
                selectedFilter
            );

            setSearchResult(filteredResults);
        } catch (error) {
            console.log(error);
        }
    };




    const handleInputChange = event => {
        setSearchValue(event.target.value);

        const searchTerm = event.target.value.toLowerCase();
        const filteredResults = filteredAndSortedProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        setSearchResult(filteredResults);
    };

    const handleClearInput = () => {
        setSearchValue('');
        const filteredAndSortedResults = sortProducts(filteredProducts, selectedFilter);
        setSearchResult(filteredAndSortedResults);
    };


    const handleClickWhist = product => {
        dispatch(addItemToWhistlist(product));
    };

    return (
        <div className=' container max-w-7xl mx-auto px-5 pb-24 sm:px-6'>
            <div className='w-full p-10 flex justify-center'>
                <h1 className='text-gray-800 text-2xl font-bold'>Shop Now</h1>
            </div>
            <div className='flex lg:items-center lg:justify-between flex-col-reverse lg:flex-row mb-5 gap-4'>
                <div className="flex gap-2 items-center overflow-auto my-scrollable-div">
                    <button
                        className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out hover:bg-gray-200 ${selectedCategory === 'All' ? 'bg-gray-200 border-gray-700' : 'border-transparent'
                            }`}
                        onClick={() => handleCategoryClick('All')}
                    >
                        <h1>All Product</h1>
                    </button>
                    <button
                        className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out hover:bg-gray-200 ${selectedCategory === "men's clothing" ? 'bg-gray-200 border-gray-700' : 'border-transparent'
                            }`}
                        onClick={() => handleCategoryClick("men's clothing")}
                    >
                        Men's Clothing
                    </button>
                    <button
                        className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out hover:bg-gray-200 ${selectedCategory === "jewelery" ? 'bg-gray-200 border-gray-700' : 'border-transparent'
                            }`}
                        onClick={() => handleCategoryClick("jewelery")}
                    >
                        Jewelery
                    </button>
                    <button
                        className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out hover:bg-gray-200 ${selectedCategory === "electronics" ? 'bg-gray-200 border-gray-700' : 'border-transparent'
                            }`}
                        onClick={() => handleCategoryClick("electronics")}
                    >
                        Electronics
                    </button>
                    <button
                        className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-4 py-2 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out hover:bg-gray-200 ${selectedCategory === "women's clothing" ? 'bg-gray-200 border-gray-700' : 'border-transparent'
                            }`}
                        onClick={() => handleCategoryClick("women's clothing")}
                    >
                        Women's Clothing
                    </button>
                </div>
                <div className='flex gap-5'>
                    <div className='relative w-full'>
                        <input
                            placeholder='Search'
                            value={searchValue}
                            onChange={handleInputChange}
                            className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm' />
                        <MagnifyingGlass className='w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' weight="bold" />
                        {searchValue && (
                            <X
                                className='w-3 h-3 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:stroke-gray-500'
                                weight='bold'
                                onClick={handleClearInput}
                            />

                        )
                        }
                    </div>
                    <div className="transform -rotate-90 ">
                        <button
                            onClick={handleOpenModalFilter}
                            className='relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 hover:bg-lime-600 transition duration-100 ease-in-out'
                        >
                            {
                                selectedFilter !== 'Relevance' ? (
                                    <span className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-white text-xs font-bold flex justify-center items-center'></span>
                                ) : (
                                    null
                                )
                            }
                            <Faders size={20} className='text-white' weight="bold" />
                        </button>
                    </div>

                </div>
            </div>
            <div className='relative w-full h-full'>
                <div className='w-full h-full grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 mt-5'>
                    {isLoading ? (
                        <div className='w-full h-[60vh] absolute flex justify-center items-center'>
                            <l-ring size="45" speed="1.75" color="black"></l-ring>
                        </div>
                    ) : searchValue ? (
                        searchResult.length > 0 ? (
                            searchResult.map((product) => (
                                <div key={product.id} className='relative bg-white rounded-xl border shadow p-4 flex flex-col justify-between '>
                                    {/* Konten produk */}
                                    <div className='mb-2'>
                                        <div className=' flex justify-center items-center w-4/5 h-32 mx-auto overflow-hidden'>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className='w-3/4 h-3/4 object-contain' />
                                        </div>
                                        <div className='relative mt-2 w-full '>
                                            <h3 className='text-gray-600 text-xs'>{capitalizeFirstLetter(product.category)}</h3>
                                            <h3 className='mb-2 sm:mb-2.5 text-xs font-bold text-gray-700 line-clamp-2 hover:line-clamp-none tracking-wider'>{product.title}</h3>
                                            <div className='flex text-gray-500'>
                                                <Star size={16} className='text-yellow-300' weight="fill" />
                                                <h1 className='px-1 text-xs'> {product.rating.rate} </h1>
                                                <h1 className='pl-1 text-xs border-l border-l-gray-400'> {product.rating.count} reviews </h1>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tombol dan ikon hati */}
                                    <div className='relative flex flex-col justify-center items-center gap-6'>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                handleProductClick(product);
                                                handleOpenModalDetail();
                                            }}
                                            className="overflow-hidden rounded-full relative w-full h-10 cursor-pointer flex items-center border border-gray-200 bg-gray-200 group hover:bg-gray-200 active:bg-gray-200 active:border-gray-200"
                                        >
                                            <span class="text-gray-800 text-sm font-semibold ml-4 transform group-hover:translate-x-20 transition-all duration-300">
                                                ${product.price}
                                            </span>
                                            <span class="absolute right-0 h-full w-10 rounded-full bg-gray-800 group-hover:bg-lime-600 text-white flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                                                <ShoppingCart size={20} weight="bold" />
                                                <span className='hidden group-hover:block ml-1 font-medium'>Add</span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className='absolute top-2 right-2'>
                                        <button
                                            onClick={() => handleClickWhist(product)}
                                        >
                                            <HeartStraight
                                                size={28}
                                                className={`${indexProduct.includes(product.title) ? 'text-red-700' : 'text-gray-300'}`}
                                                weight="fill"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-[40vh] absolute flex justify-center items-center">
                                <div className="text-center">
                                    <div className='flex justify-center items-center'>
                                        <img src={NoBox} alt="..." className=' max-sm:w-14 sm:w-20 md:w-32' />
                                    </div>
                                    <h1 className='text-gray-400  max-sm:text-xs sm:text-sm md:text-base font-bold p-2'>No products found.</h1>
                                </div>
                            </div>
                        )
                    ) : filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map((product) => (
                            <div key={product.id} className='relative bg-white rounded-xl border shadow p-4 flex flex-col justify-between '>
                                {/* Konten produk */}
                                <div className='mb-2'>
                                    <div className=' flex justify-center items-center w-4/5 h-32 mx-auto overflow-hidden'>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className='w-3/4 h-3/4 object-contain' />
                                    </div>
                                    <div className='relative mt-2 w-full '>
                                        <h3 className='text-gray-600 text-xs'>{capitalizeFirstLetter(product.category)}</h3>
                                        <h3 className='mb-2 sm:mb-2.5 text-xs font-bold text-gray-700 line-clamp-2 hover:line-clamp-none tracking-wider'>{product.title}</h3>
                                        <div className='flex text-gray-500'>
                                            <Star size={16} className='text-yellow-300' weight="fill" />
                                            <h1 className='px-1 text-xs'> {product.rating.rate} </h1>
                                            <h1 className='pl-1 text-xs border-l border-l-gray-400'> {product.rating.count} reviews </h1>
                                        </div>
                                    </div>
                                </div>
                                {/* Tombol dan ikon hati */}
                                <div className='relative flex flex-col justify-center items-center gap-6'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            handleProductClick(product);
                                            handleOpenModalDetail();
                                        }}
                                        className="overflow-hidden rounded-full relative w-full h-10 cursor-pointer flex items-center border border-gray-200 bg-gray-200 group hover:bg-gray-200 active:bg-gray-200 active:border-gray-200"
                                    >
                                        <span class="text-gray-800 text-sm font-semibold ml-4 transform group-hover:translate-x-20 transition-all duration-300">
                                            ${product.price}
                                        </span>
                                        <span class="absolute right-0 h-full w-10 rounded-full bg-gray-800 group-hover:bg-lime-600 text-white flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                                            <ShoppingCart size={20} weight="bold" />
                                            <span className='hidden group-hover:block ml-1 font-medium'>Add</span>
                                        </span>
                                    </button>
                                </div>
                                <div className='absolute top-2 right-2'>
                                    <button
                                        onClick={() => handleClickWhist(product)}
                                        className=''
                                    >
                                        <HeartStraight
                                            size={28}
                                            className={`${indexProduct.includes(product.title) ? 'text-red-700' : 'text-gray-300'}`}
                                            weight="fill"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-[60vh] absolute top-0 left-0 flex justify-center items-center ">
                            <div className="text-center">
                                <div className='flex justify-center items-center'>
                                    <img src={NoBox} alt="..." className=' max-sm:w-14 sm:w-20 md:w-32' />
                                </div>
                                <h1 className='text-gray-400  max-sm:text-xs sm:text-sm md:text-base font-bold p-2'>No products found.</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>


    )
}

export default ProductList