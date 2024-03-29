import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Filtres from '../components/Filtres'
import Places from '../components/places/Places'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AirbBnb</title>
        <link rel="icon" href="https://cdn.freebiesupply.com/logos/large/2x/airbnb-2-logo-png-transparent.png" />
      </Head>

    <Header/>
    <Filtres/>
    <Places/>
    <Footer/>
    
    
    </div>
  )
}

export default Home
