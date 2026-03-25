import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card' // Naya Card component import kiya

const App = () => {
  const [UserData, setUserData] = useState([])
  const [page, setPage] = useState(1) 
  const [loading, setLoading] = useState(false)

  async function Get_Data() {
    setLoading(true)
    try {
      // Dynamic page logic
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=20`)
      setUserData(response.data)
      window.scrollTo(0, 0) // Naya page aane par upar le jaye
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    Get_Data()
  }, [page]) // Page change hone par refresh hoga

  return (
    <div className='bg-black min-h-screen p-5 sm:p-10 flex flex-col items-center'>
      
      {/* Responsive Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
        {loading ? (
          <h3 className='text-2xl text-gray-500 col-span-full text-center py-20'>Loading Page {page}...</h3>
        ) : (
          UserData.map((elm, idx) => (
            <Card key={elm.id || idx} elm={elm} /> // Card component yahan use ho raha hai
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className='flex gap-5 mt-12 mb-10'>
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
            page === 1 
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-gray-200 active:scale-95'
          }`}
        >
          Previous
        </button>

        <div className='flex items-center text-white font-bold text-xl'>
          Page {page}
        </div>

        <button 
          onClick={() => setPage(prev => prev + 1)}
          className='px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 active:scale-95 transition-all duration-300'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App