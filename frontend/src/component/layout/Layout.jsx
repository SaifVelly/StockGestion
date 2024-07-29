import React from 'react';
import Header from '../header/Header';
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({children}) => {
  return (
    <section className="flex">
        <Sidebar/>
        <main className="flex flex-col flex-1">
          <Header/>
            {children}
          <Footer/>
        </main>
    </section>
  )
}

export default Layout