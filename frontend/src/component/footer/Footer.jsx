import React from 'react';
import {MdAccountBalance} from 'react-icons/md';


const Footer = () => {
    return (
        <footer className="bg-gray-900 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <span className="flex title-font font-medium items-center md:justify-start justify-center text-gray-100">
                <MdAccountBalance size="25"/>
                <span className="ml-2 text-xl">GL -Distribution</span>
                </span>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 GL -Distribution —
                <a href="" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">Kssim Mohammed</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                
                </span>
            </div>
        </footer>
    )
}

export default Footer;