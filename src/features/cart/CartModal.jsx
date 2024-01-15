/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import NoCart from "../../assets/cart.png"
import Modal from "../../components/Modal";
import { CaretLeft, X } from "@phosphor-icons/react"
import { capitalizeFirstLetter } from "../../utility/utils";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrices,
} from "./cartSlice";
import { useEffect, useRef } from "react";

const CartModal = ({ isOpenModalCart, handleHideModalCart }) => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrices);
  const dispatch = useDispatch()
  const modalRef = useRef(null);

  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281320928427";
    const message = encodeURIComponent(
      `Halo!! Assalamualaikum, salam kenal wahai admin yang baik hati dan tidak sombong, saya ingin membeli ${totalItems} barang dengan total harga $${totalPrice}USD, apakah bisa?`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const formattedTotalPrice = Number(totalPrice.toFixed(2));

  const handlePlus = (product) => {
    dispatch(addItemToCart(product))
  }

  const handleMinus = (product) => {
    dispatch(removeItemFromCart(product))
  }
  const handleClear = (product) => {
    dispatch(clearItemFromCart(product))
  }

  const handleOutsideClick = (event) => {
    // Tutup modal jika klik dilakukan di luar area modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleHideModalCart();
    }
  };
  useEffect(() => {
    // Tambahkan event listener ketika modal dibuka
    if (isOpenModalCart) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Hapus event listener ketika modal ditutup atau komponen di-unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenModalCart, handleHideModalCart]);



  return (
    <Modal >
      <div className="w-full relative" ref={modalRef} >
        <div className="px-5 overflow-y-auto h-[42vh]">
          <div className="h-full">
            <div className="w-full absolute -top-10 left-0">
              <h3 className="text-center font-bold">Cart</h3>
            </div>
            {/* Back & Title */}
            <div className="w-full absolute -top-10 left-3">
              <button
                type="button"
                className="rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
                onClick={handleHideModalCart}
              >
                <CaretLeft size={14} weight="bold" />
              </button>
            </div>
            {/* Cart */}
            {
              totalItems !== 0 ? (
                <div>
                  {cartItems.map((product) => {
                    const formatUsdProduct = Number(product.totalPrice.toFixed(2))
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
                          <div className="ml-2 w-3/4">
                            <h3 className="text-sm font-bold">{product.title}</h3>
                            <h3 className="text-xs text-gray-500">{capitalizeFirstLetter(product.category)}</h3>
                            <h3 className="text-sm mt-2">${formatUsdProduct} USD</h3>
                            <div className="absolute top-0 right-2">
                              <button
                                onClick={() => handleClear(product)}
                                className="text-gray-400">
                                <X size={16} weight="bold" />
                              </button>
                            </div>
                            <div className="absolute bottom-0 right-0">
                              <div className="w-24 flex justify-center items-center gap-4 border border-gray-300 rounded-full p-1 ">
                                <button
                                  type="button"
                                  className="rounded-full w-10 h-auto text-black flex items-center justify-center"
                                  onClick={() => handleMinus(product)}
                                >
                                  -
                                </button>
                                <h3 className="text-sm">{product.quantity}</h3>
                                <button
                                  type="button"
                                  className="rounded-full w-10 h-auto text-black flex items-center justify-center"
                                  onClick={() => handlePlus(product)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <div className=" text-center">
                    <div className="flex justify-center items-center py-2">
                      <img src={NoCart} alt="..." />
                    </div>
                    <h1 className="text-sm font-semibold">You cart is empty.</h1>
                    <h1 className="text-sm text-gray-400">Add something to make me happy 😃</h1>
                    <div className="p-3">
                      <button
                        onClick={handleHideModalCart}
                        className=" p-3 rounded-lg bg-lime-600 hover:bg-lime-500 text-white text-sm font-bold">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              )

            }

          </div>
        </div>
        <div className="sticky md:static inset-x-0 bottom-0">
          <div className="border-t border-gray-300 px-5">
            <div className="flex justify-between items-center my-4">
              <h3 className="text-md font-bold">Total</h3>
              <h3 className="text-md font-bold">${formattedTotalPrice} USD</h3>
            </div>
            <div className="w-full">
              <button
                className={`${totalItems !== 0 ? 'bg-gray-800 hover:bg-lime-600' : 'bg-gray-300 cursor-not-allowed'} w-full text-center  p-3 rounded-xl text-white  transition-all duration-75 ease-in-out `}
                onClick={totalItems !== 0 ? handleCheckoutToWhatsapp : null}
              >
                Proceed to Checkout (Whatsapp)
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;

