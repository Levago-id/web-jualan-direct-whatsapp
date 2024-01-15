/* eslint-disable react/prop-types */
import { useSelector,useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import NoWhist from "../../assets/whistlist.png"
import { CaretLeft, X } from "@phosphor-icons/react"
import { capitalizeFirstLetter } from "../../utility/utils";
import { addItemToCart, selectCartItems } from "../cart/cartSlice"
import { removeItemFromWhistlist, selectWhistItems, selectWhistTotalItems } from "./whistlistSlice"
import { useEffect, useRef } from "react";

const WhistlistModal = ({ setIsOpenModalCart, setIsOpenModalWhistlist, isOpenModalWhistlist, handleHideModalWhistlist }) => {
  const whistItems = useSelector(selectWhistItems);
  const whistTotalItems = useSelector(selectWhistTotalItems);
    
  const dispatch = useDispatch()
  const modalRef = useRef(null);

      const handleAddCart = (product) => {
          dispatch(addItemToCart(product))
          setIsOpenModalWhistlist(false)
          setIsOpenModalCart(true)
          
    }

      const handleRemove = (product) => {
        dispatch(removeItemFromWhistlist(product))
    }
   
  const handleOutsideClick = (event) => {
    // Tutup modal jika klik dilakukan di luar area modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleHideModalWhistlist();
    }
  };
   useEffect(() => {
    // Tambahkan event listener ketika modal dibuka
    if (isOpenModalWhistlist) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Hapus event listener ketika modal ditutup atau komponen di-unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenModalWhistlist, handleHideModalWhistlist]);



  return (
    <Modal >
      <div className="w-full relative" ref={modalRef} >
         <div className="px-5 overflow-y-auto h-[50vh]">
          <div className="h-full">
            <div className="w-full absolute -top-10 left-0">
                <h3 className="text-center font-bold">WhistList</h3>
            </div>
            {/* Back & Title */}
            <div className="w-full absolute -top-10 left-3">
              <button
                type="button"
                className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
                onClick={handleHideModalWhistlist}
              >
                <CaretLeft size={14} weight="bold" />
                </button> 
            </div>
            {/* Whislist */}
            {
              whistTotalItems !== 0 ? (
              <div>
                  {whistItems.map((product) => {
                    return (
                      <div
                        className="border-b border-dashed border-gray-200 py-4 flex items-center space-x-3"
                        key={product.id}
                      >
                        <div className="relative flex w-full">
                          <div className="overflow-hidden w-14 h-20 px-2">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain object-center"
                            />
                          </div>
                          <div className="ml-5 w-3/4">
                            <h3 className="text-sm font-bold">{product.title}</h3>
                            <h3 className="text-xs text-gray-500">{capitalizeFirstLetter(product.category)}</h3>
                            <h3 className="text-base mt-3 font-medium">${product.price} USD</h3>
                            <div className="absolute top-0 right-2">
                              <button
                                onClick={()=> handleRemove(product)}
                                className="text-gray-400">
                                  <X size={16} weight="bold" />
                              </button>
                            </div>
                            <div className="absolute bottom-0 right-3">
                                <div className="w-24 text-center bg-gray-800 p-2 rounded-xl flex justify-center items-center hover:bg-lime-600 transition-all duration-75 ease-in-out ">
                                    <button
                                        className="text-white text-sm font-semibold"
                                        onClick={()=> handleAddCart(product)}      
                                    >
                                    Add Cart                
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
              </div>
              ): (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className=" text-center">
                      <div className="flex justify-center items-center py-2">
                        <img src={NoWhist} alt="..." />
                      </div>
                        <h1 className="text-sm font-semibold">Your wishlist is empty.</h1>
                      <h1 className="text-sm text-gray-400">Tap the heart on any item to start saving your favorites ✨.</h1>
                      <div className="p-3">
                        <button
                          onClick={handleHideModalWhistlist}
                          className=" p-3 rounded-lg bg-lime-600 hover:bg-lime-500 text-white text-sm font-bold">
                            Continue Shopping
                        </button>
                      </div>
                      </div>
                  </div>
              )
            }
           
          </div>
        </div>
      </div>
    </Modal>
  );
  };

export default WhistlistModal;

