/* eslint-disable react/prop-types */
import Modal from "../../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { CaretLeft, Circle } from "@phosphor-icons/react"
import { useEffect, useState, useRef } from "react";
import { addFilter, selectFilter } from "./filterSlice";

const FilterModal = ({ isOpenModalFilter, handleHideModalFilter }) => {
  
    const modalRef = useRef(null);
    const dispatch = useDispatch()
    const sortFilter =  useSelector(selectFilter)

    console.log(sortFilter)
    
    const [selectedFilter, setSelectedFilter] = useState(sortFilter);

  const handleOutsideClick = (event) => {
    // Tutup modal jika klik dilakukan di luar area modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleHideModalFilter();
    }
  };
   useEffect(() => {
    // Tambahkan event listener ketika modal dibuka
    if (isOpenModalFilter) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Hapus event listener ketika modal ditutup atau komponen di-unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenModalFilter, handleHideModalFilter]);


    const handleFilterClick = (filter) => {
        setSelectedFilter(filter)
    }

    const handleResult = (filter) => {
        dispatch(addFilter(filter))
        handleHideModalFilter()
    }

  return (
    <Modal >
      <div className="w-full relative" ref={modalRef} >
         <div className="px-5 overflow-y-auto h-[50vh]">
          <div className="h-full">
            <div className="w-full absolute -top-8 left-0">
                <h3 className="text-center font-bold">Filters</h3>
            </div>
            {/* Back & Title */}
            <div className="w-[92%] absolute flex justify-between -top-10 left-5">
                <button
                    type="button"
                    className="rounded-lg bg-gray-200 p-3 hover:bg-gray-300"
                    onClick={handleHideModalFilter}
                >
                    <CaretLeft size={14} weight="bold" />
                </button> 
                <button
                    type="button"
                    className="rounded-lg bg-gray-200 p-2 text-sm hover:bg-gray-300"
                    onClick={()=> handleResult('Relevance')}
                >
                    Reset
                </button> 
            </div>
            <div>
                <h1 className="w-full text-lg font-bold px-1 py-3">Sort By</h1>       
                <div className=" w-full ">
                    <div className=" w-full flex justify-between items-center px-1 py-3">
                        <h1 className="font-medium">Relevance</h1>
                        <button
                            className={`border-8 ${selectedFilter === 'Relevance' ? 'border-gray-800' : 'border-gray-300' } rounded-full text-white `}
                            onClick={() =>handleFilterClick('Relevance')}
                        >
                            <Circle size={10} weight="fill" />
                        </button>
                    </div>
                    <div className=" w-full flex justify-between items-center px-1 py-3">
                        <h1 className="font-medium">Highest Price</h1>
                        <button
                            className={`border-8 ${selectedFilter === 'Highest' ? 'border-gray-800' : 'border-gray-300' } rounded-full text-white `}
                            onClick={() =>handleFilterClick("Highest")}
                        >
                            <Circle size={10} weight="fill" />
                        </button>
                    </div>
                    <div className=" w-full flex justify-between items-center px-1 py-3">
                        <h1 className="font-medium">Lowest Price</h1>
                        <button
                            className={`border-8 ${selectedFilter === 'Lowest' ? 'border-gray-800' : 'border-gray-300' } rounded-full text-white `}
                            onClick={() =>handleFilterClick("Lowest")}
                        >
                            <Circle size={10} weight="fill" />
                        </button>
                    </div>
                    <div className=" w-full flex justify-between items-center px-1 py-3">
                        <h1 className="font-medium">A - Z</h1>
                        <button
                            className={`border-8 ${selectedFilter === 'A-Z' ? 'border-gray-800' : 'border-gray-300' } rounded-full text-white `}
                            onClick={() =>handleFilterClick("A-Z")}
                        >
                            <Circle size={10} weight="fill" />
                        </button>
                    </div>
                    <div className=" w-full flex justify-between items-center px-1 py-3">
                        <h1 className="font-medium">Z - A</h1>
                        <button
                            className={`border-8 ${selectedFilter === 'Z-A' ? 'border-gray-800' : 'border-gray-300' } rounded-full text-white `}
                            onClick={() =>handleFilterClick("Z-A")}
                        >
                            <Circle size={10} weight="fill" />
                        </button>
                    </div>
                </div>          
            </div>
          </div>
        </div>
        <div className="sticky md:static inset-x-0 bottom-0">
          <div className="px-5">
              <button
                className="w-full text-center bg-gray-800 hover:bg-lime-600 transition-all duration-75 ease-in-out p-3 rounded-xl text-white"
                onClick={()=> handleResult(selectedFilter)}
              >
                  Show Result
              </button>
          </div>
        </div>
      </div>
    </Modal>
  );
  };

export default FilterModal;

