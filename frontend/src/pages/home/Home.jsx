import React from 'react';
import { MdAccountBalance } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import stockImg from '../../assets/Stock720.png';
import Footer from '../../component/footer/Footer';
import { ShowOnLogin, ShowOnLogout } from '../../utils/hiddenLink';

const Home = () => {
    const navigate = useNavigate();

    const onLoginClick = () => {
        navigate('/login');
    }

    const onRegisterClick = () => {
        navigate('/register');
    }

    const onDashboardClick = () => {
        navigate('/dashboard');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="text-gray-100 body-font bg-gray-800 w-full">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a href="href" className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0">
                        <MdAccountBalance size="24" />
                        <span className="ml-3 text-xl">GL -Distribution</span>
                    </a>
                    <div className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-2">
                        <ShowOnLogout>
                            <button onClick={onLoginClick} className="inline-flex items-center bg-teal-500 border-0 py-1 px-3 focus:outline-none hover:bg-teal-600 rounded text-base mt-4 md:mt-0">Login</button>
                            <button onClick={onRegisterClick} className="inline-flex items-center bg-teal-500 border-0 py-1 px-3 focus:outline-none hover:bg-teal-600 rounded text-base mt-4 md:mt-0">Register</button>
                        </ShowOnLogout>
                        <ShowOnLogin>
                            <button onClick={onDashboardClick} className="inline-flex items-center bg-teal-500 border-0 py-1 px-3 focus:outline-none hover:bg-teal-600 rounded text-base mt-4 md:mt-0">Dashboard</button>
                        </ShowOnLogin>
                    </div>
                </div>
            </header>
            <section className="text-gray-100 body-font bg-gray-700 flex-grow w-full flex flex-col justify-center">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-16 md:pr-12 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-5xl text-4xl mb-6 font-bold text-white">Gestion de la matière première
                            <br className="hidden lg:inline-block" />  et du stock
                        </h1>
                        <p className="mb-8 leading-relaxed text-lg text-gray-200">Systeme de gestion de stock et de matière première pour GL- DISTRIBUTION.</p>
                        <ShowOnLogout>
                            <div className="flex justify-center">
                                <button onClick={onLoginClick} className="inline-flex text-gray-100 bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg shadow-lg transform hover:scale-105 transition-transform">Connectez-vous !</button>
                            </div>
                        </ShowOnLogout>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded-lg shadow-lg" alt="hero" src={stockImg} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;
