import React, { useEffect, useState } from 'react';
import { CaretUp } from '@phosphor-icons/react'
import 'animate.css'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const halfViewportHeight = window.innerHeight / 2;
        setIsVisible(window.scrollY > halfViewportHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        isVisible && (
            <button onClick={scrollToTop} className={`animate__animated ${isVisible ? 'animate__fadeInUp' : ''} z-50 fixed bottom-16 right-3 p-2 cursor-pointer bg-gray-800 hover:bg-lime-500 text-white border-none rounded-full outline-none`}
            >
                <CaretUp size={40} weight='bold' />
            </button>
        )
    );
};

export default ScrollToTopButton;
