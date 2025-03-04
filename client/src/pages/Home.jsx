import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Header />
            <SpecialityMenu />
            <TopDoctors isHomePage={true}/>
            <Banner />
        </>
    )
}

export default Home