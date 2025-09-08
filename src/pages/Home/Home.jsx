import React from 'react'
import Navpar from '../../components/Navpar/Navpar'
import './Home.css'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>

 <Navpar/>
 <div className="hero">
    <img src={ hero_banner} alt="hero_banner" className='hero-img' />
 </div>
<div className="caption">
<img src={hero_title} alt="" className='title' />
<p>"The Protector" is a Turkish fantasy drama series following Hakan, a young man who discovers he's part of an ancient secret order tasked with protecting Istanbul from an immortal enemy. </p>

<div className="btn">
<button className='play'> <img src={play_icon} alt="play_icon" /> play</button>
<button className='info'> <img src={info_icon} alt="info_icon" /> more info</button>

</div>
<Cards/>

</div>
<div className="more">
  <Cards title={"Blockbuster Movies"} category={"top_rated"}/>
        <Cards title={"Only On Netflix"} category={"upcoming"}/>
    <Cards title={ "Top Rated"} category={"top_rated"}/>

  <Cards title={  "New Releases"} category={ "upcoming"}/>


   
</div>
<Footer/>

    </div>
  )
}

export default Home