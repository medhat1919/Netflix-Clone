 import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import './Nav.css'
import profile_img from '../../assets/Profile_img.png'

import caret_icon from '../../assets/caret_icon.svg'
 




const Navpar = () => {
    
  

  return (
    
    <div className='Navpar'
    > 
<div className="navleft">

<img src={logo} alt="logo" />
        <ul>
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li> New & popular</li>
            <li>My lists</li>
            <li> Browse By languages</li>
        </ul></div>


        <div className="navright">
<img src={search_icon} alt="search icon" />
<p>children</p>
<img src={bell_icon} alt="search icon" />

<div className="navimg">
<img src={profile_img} alt="" className='prof' />
<img src={caret_icon} alt="" className='caret' />
<div className="drop">
    <p> sign out of netflix</p>
</div>

</div>

        </div>
    </div>
  )
}

export default Navpar