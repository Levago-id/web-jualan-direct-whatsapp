/* eslint-disable react/prop-types */
import {useDispatch, useSelector} from "react-redux"
import Modal from "../../components/Modal";
import { CaretLeft, Star, HeartStraight } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utility/utils";
import { addItemWithQuantity } from "../cart/cartSlice";
import { addItemToWhistlist, selectWhistItems } from "../whistlist/whistlistSlice";

const DetailModal = ({ isOpenModalDetail, handleHideModalDetail, selectedProduct }) => {
    const modalRef = useRef(null);
    const dispatch = useDispatch()
  const whistItems = useSelector(selectWhistItems)
  
    const [numberQty, setNumberQty] = useState(1)

    const formattedTotalPrice = Number((selectedProduct.price * numberQty).toFixed(2));


  const handleOutsideClick = (event) => {
    // Tutup modal jika klik dilakukan di luar area modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleHideModalDetail();
    }
  };
   useEffect(() => {
    // Tambahkan event listener ketika modal dibuka
    if (isOpenModalDetail) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Hapus event listener ketika modal ditutup atau komponen di-unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenModalDetail, handleHideModalDetail]);


   const handlePlus = () => {
    setNumberQty(prevQty => prevQty + 1);
  };
    const handleMinus = () => {
       if (numberQty > 1) {
           setNumberQty(prevQty => prevQty - 1);
       }
    };
    
    const handleClickCart = () => {
        dispatch(addItemWithQuantity({ newItem: selectedProduct, quantity: numberQty }));
        handleHideModalDetail()
  };

  const indexProduct = [...new Set(whistItems.map(product => product.title))];

   const handleClickWhist = product => {
    dispatch(addItemToWhistlist(product));
  };


  return (
    <Modal >
      <div className="w-full relative" ref={modalRef} >
         <div className="px-5 overflow-y-auto h-[55vh]">
          <div className="h-full">
            <div className="w-full absolute -top-10 left-0">
                <h3 className="text-center font-bold">Detail Product</h3>
            </div>
            {/* Back & Title */}
            <div className="w-full absolute -top-10 left-3">
              <button
                type="button"
                className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
                onClick={handleHideModalDetail}
              >
                <CaretLeft size={14} weight="bold" />
                </button> 
            </div>
                <div className="w-full h-full ">
                    <div className="relative w-full flex justify-center items-center border border-gray-300 rounded-xl py-6 my-3">
                        <div className="overflow-hidden w-24 h-24 px-2 ">
                            <img src={selectedProduct.image} alt="..." className="w-full h-full object-contain object-center" />
                        </div>
                         <div className='absolute top-2 right-2'>
                               <button
                                    onClick={() => handleClickWhist(selectedProduct)}
                                    className=''
                                >
                                    <HeartStraight 
                                        size={28}
                                        className={`${indexProduct.includes(selectedProduct.title) ? 'text-red-700' : 'text-gray-300'}`}
                                        weight="fill"
                                    />
                              </button>
                          </div>
                    </div>
                    <div className="my-5">
                        <div className=" relative my-5">
                            <h1 className="font-bold">{selectedProduct.title}</h1>
                            <h1 className="text-sm text-gray-500 tracking-tight">{capitalizeFirstLetter(selectedProduct.category)}</h1>
                            <div className=" flex justify-center items-center absolute top-0 right-0 bg-yellow-100 py-1 px-3 rounded-3xl gap-1.5">
                                <Star size={15} className="text-yellow-400" weight="fill" />
                                <h1 className="text-orange-600 text-sm font-semibold">
                                    {selectedProduct.rating.rate}
                                </h1>
                            </div>
                        </div>
                        <div className="">
                            <h1 className="text-sm font-semibold">Description</h1>
                            <h1 className="text-xs text-gray-500 mt-1 tracking-wide">{selectedProduct.description}</h1>
                        </div>
                        <div className="flex py-3 items-center gap-5">
                                  <h1 className="text-sm font-semibold">Quantity</h1>
                                   <div className="w-24 flex justify-center items-center gap-4 border border-gray-300 rounded-full p-1 ">
                                      <button
                                        type="button"
                                          className={`${numberQty === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black cursor-pointer'}rounded-full w-10 h-auto  flex items-center justify-center`}
                                          onClick={handleMinus}
                                      >
                                        -
                                      </button>
                                      <h3 className="text-sm">{ numberQty }</h3>
                                      <button
                                        type="button"
                                          className="rounded-full w-10 h-auto text-black flex items-center justify-center"
                                          onClick={handlePlus}
                                      >
                                        +
                                      </button>
                                  </div>
                        </div>
                    </div>
                </div>
              
           
          </div>
        </div>
        <div className="sticky md:static inset-x-0 bottom-0">
          <div className="border-t border-gray-300 px-5">
            <div className="w-full pt-5">
              <button
                className={` w-full text-center bg-gray-800 p-3 rounded-xl text-white text-sm font-bold tracking-wide hover:bg-lime-600 transition-all duration-75 ease-in-out `}
                onClick={()=> handleClickCart(numberQty)  }
              >
                Add To Cart | ${formattedTotalPrice} USD
              </button>
            </div> 
          </div>
        </div>
      </div>
    </Modal>
  );
  };

export default DetailModal;

