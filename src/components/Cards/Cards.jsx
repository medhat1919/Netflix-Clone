import React, { useEffect } from 'react'
import './Cards.css'
import { useRef, useState } from 'react'

const Cards = ({title,category}) => {


const [Apidata,SetApidata]=useState([])

const imgs=useRef();
const options = {method: 'GET', headers: {accept: 'application/json',
  Authorization:'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjNkYzVlMDA2MjFmMDU1NTgyYjYxYjYxNThlMzBkYyIsIm5iZiI6MTc1NTE4ODYwOC45NTUwMDAyLCJzdWIiOiI2ODllMGQ4MGExMDBmZmZmMjA1ZDI1M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.r9FgdGAFDnDO7KVFAop5692TAaw_uzVGyZnz4cTg7FM' }};


useEffect(()=>{

fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => {if (res.results && res.results.length > 0) {
          SetApidata(res.results);
        } else {
          console.error("API returned no movies or an error:", res);}
        })
 
  .catch(err => console.error(err));



  imgs.current.addEventListener('scroll',(e)=>{
    e.preventDefault()
    imgs.current.scrollLeft+=e.deltaY
    
  })
},[])




  return (
 

  



    <div className='cards'> 
<h2>{title?title:'popular on netflix'} </h2>
<div className="cardsimgs" ref={imgs}>

{Apidata.map((card ,index)=>{

return (
    <div className="card" key={index} onClick={()=>{window.location.href=`/Play/${card.id}`}} >
        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}` } alt="" />
        <p>{card.original_title}</p>
    </div>
)




})}

</div>




    </div>
  )
}

export default Cards