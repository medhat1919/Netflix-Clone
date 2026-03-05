import React from 'react'
import Navpar from '../../components/Navpar/Navpar'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'

const NewPopular = () => {
    return (
        <div className='relative min-h-screen bg-[#141414]'>
            <Navpar />

            <main className="pt-24 space-y-12 pb-24">
                <div className="px-6 lg:px-16">
                    <h1 className="text-3xl md:text-5xl font-black text-white">New & Popular</h1>
                </div>

                <section className="space-y-12">
                    <Cards title="Trending Now (Movies)" type="movie" category="popular" />
                    <Cards title="Trending Now (TV)" type="tv" category="popular" />
                    <Cards title="New Releases (Movies)" type="movie" category="now_playing" />
                    <Cards title="Upcoming Hits" type="movie" category="upcoming" />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default NewPopular
