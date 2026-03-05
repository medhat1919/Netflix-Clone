import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import axios from '../../api/axios'

const Play = () => {
  const { type, id } = useParams()
  const navigate = useNavigate()

  const [Apidata, SetApidata] = useState({ name: "", key: "", published_at: "", type: "" })

  useEffect(() => {
    axios.get(`/${type}/${id}/videos?language=en-US`)
      .then(res => {
        if (res.data.results && res.data.results.length > 0) {
          // Find a trailer if possible, otherwise first video
          const video = res.data.results.find(v => v.type === 'Trailer') || res.data.results[0]
          SetApidata(video)
        } else {
          console.error("No video results found.")
        }
      })
      .catch(err => console.error(err))
  }, [id])

  return (
    <div className="flex h-screen w-screen flex-col bg-black">
      {/* Back Button */}
      <div
        className="absolute top-6 left-6 z-50 flex items-center gap-2 cursor-pointer text-white/80 hover:text-white transition group"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-8 w-8 transition-transform group-hover:-translate-x-1" />
        <span className="text-xl font-bold">Back</span>
      </div>

      {/* Player */}
      <div className="flex-grow">
        {Apidata.key ? (
          <iframe
            src={`https://www.youtube.com/embed/${Apidata.key}?autoplay=1&mute=0&rel=0`}
            title="Trailer"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="flex h-full items-center justify-center text-white text-2xl font-bold bg-[#141414]">
            Trailer not available for this title
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-col space-y-2 p-6 md:p-10 bg-[#141414] text-white border-t border-white/10">
        <div className="flex items-center space-x-4 text-sm font-semibold text-gray-400">
          <p>{Apidata.published_at?.split('T')[0]}</p>
          <p className="rounded border border-white/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white">
            {Apidata.type}
          </p>
        </div>
        <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">{Apidata.name}</h1>
      </div>
    </div>
  )
}

export default Play