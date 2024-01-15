import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./features/productList/ProductList";
import CartModal from "./features/cart/CartModal";
import WhistlistModal from "./features/whistlist/whistlistModal";
import FilterModal from "./features/filter/FilterModal";
import DetailModal from "./features/detail/DetailModal";
import Footer from "./components/Footer";
import ScrollToTopButton from "./utility/utilsComp/ScrollToTop";

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalWhistlist, setIsOpenModalWhistlist] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };

  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };
  const handleOpenModalWhistlist = () => {
    setIsOpenModalWhistlist(true);
  };

  const handleHideModalWhistlist = () => {
    setIsOpenModalWhistlist(false);
  };
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true);
  };

  const handleHideModalFilter = () => {
    setIsOpenModalFilter(false);
  };
  const handleOpenModalDetail = () => {
    setIsOpenModalDetail(true);
  };

  const handleHideModalDetail = () => {
    setIsOpenModalDetail(false);
  };

  useEffect(() => {
    const handleOverflow = () => {
      if (isOpenModalCart || isOpenModalWhistlist || isOpenModalFilter || isOpenModalDetail) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    handleOverflow();

    return () => {
      // Membersihkan efek samping jika komponen unmount
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpenModalCart || isOpenModalWhistlist || isOpenModalFilter || isOpenModalDetail]);


  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      {isOpenModalCart ? (
        <CartModal
          isOpenModalCart={isOpenModalCart}
          handleHideModalCart={handleHideModalCart}
        />
      ) : null}
      {isOpenModalWhistlist ? (
        <WhistlistModal
          setIsOpenModalCart={setIsOpenModalCart}
          setIsOpenModalWhistlist={setIsOpenModalWhistlist}
          isOpenModalWhistlist={isOpenModalWhistlist}
          handleHideModalWhistlist={handleHideModalWhistlist}
        />
      ) : null}
      {isOpenModalFilter ? (
        <FilterModal
          isOpenModalFilter={isOpenModalFilter}
          handleHideModalFilter={handleHideModalFilter}
        />
      ) : null}
      {isOpenModalDetail ? (
        <DetailModal
          isOpenModalDetail={isOpenModalDetail}
          handleHideModalDetail={handleHideModalDetail}
          selectedProduct={selectedProduct}
        />
      ) : null}
      <Header handleOpenModalCart={handleOpenModalCart} handleOpenModalWhistlist={handleOpenModalWhistlist} />
      <main className="max-w-7xl mx-auto px-4 ">
        <ProductList
          handleOpenModalFilter={handleOpenModalFilter}
          handleOpenModalDetail={handleOpenModalDetail}
          handleProductClick={handleProductClick} />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}

export default App;