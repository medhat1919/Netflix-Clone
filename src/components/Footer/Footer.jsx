import React from 'react'
import facebook_icon from '../../assets/facebook_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import youtube_icon from '../../assets/youtube_icon.png'
import './Footer.css'


const Footer = () => {
  return (
    <div className='Footer'>
        <div className="social">
            <img src={facebook_icon} alt="facebook_icon" />
            <img src={twitter_icon} alt="twitter_icon" />
            <img src={instagram_icon} alt="instagram_icon" />
            <img src={youtube_icon} alt="youtube_icon" />
        </div>
        
        <ul>
<li>Audio Despcreption </li>
<li> Help Center </li>
<li>Media Center </li>
<li>Gifts Cards </li>
<li>Investor Relations </li>
<li> Jops</li>
<li> Terms of Use</li>
<li>Privacy </li>
<li> Legal Notice</li>
<li>Cookie Preferences </li>
<li>Contact Us </li>
<li>corporate Information </li>
        </ul>
        
        
         </div>
  )
}

export default Footer