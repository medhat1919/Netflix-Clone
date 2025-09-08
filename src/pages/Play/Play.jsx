import React, { useEffect, useState } from 'react'
import './Play.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Play = () => {
    const {id}=useParams();
    const navigate=useNavigate();

const [Apidata,SetApidata]=useState({ name:"" , key:"", puplished_at:"" ,type:""})

const options = {method: 'GET', headers: {accept: 'application/json',
     Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjNkYzVlMDA2MjFmMDU1NTgyYjYxYjYxNThlMzBkYyIsIm5iZiI6MTc1NTE4ODYwOC45NTUwMDAyLCJzdWIiOiI2ODllMGQ4MGExMDBmZmZmMjA1ZDI1M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.r9FgdGAFDnDO7KVFAop5692TAaw_uzVGyZnz4cTg7FM '}};

useEffect(()=>{


fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => { if (res.results && res.results.length > 0) {
                    SetApidata(res.results[0]);
                } else {
                    console.error("No video results found.");}
                })
  .catch(err => console.error(err));






},[])




  return (




    <div className='playvideo'>
        <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
        <iframe src={`https://www.youtube.com/embed/${Apidata.key}`}
        width={"90%"} height={"90%"} frameborder="0" allowFullScreen></iframe>
        
        <div className="text">
            <p>{Apidata.puplished_at}</p>
<p>{Apidata.name.slice(0,23)}</p> 
<p>{Apidata.type}</p>
        </div>
        
        
        
        
         </div>
  )
}

export default Play