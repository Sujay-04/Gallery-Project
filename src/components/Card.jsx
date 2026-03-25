import React, { useState } from 'react'

const Card = ({ elm }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <a href={elm.url} target='_blank' rel="noopener noreferrer" className="block group">
      <div className='relative h-64 w-full overflow-hidden rounded-3xl bg-gray-900'>
        {/* Image with smooth fade-in and hover zoom */}
        <img 
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`} 
          src={elm.download_url} 
          alt={elm.author} 
        />
        {/* Permanent name overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5'>
          <h2 className='text-white text-lg font-medium'>{elm.author}</h2>
        </div>
      </div>
    </a>
  )
}

export default Card