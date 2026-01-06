import React from 'react'

const ScrollToTop = () => {
  return (
    <div className='fixed bottom-6 right-6 z-48'>
      <button type='button' className={`bg-red-600 hover:bg-red-700 text-white p-2.5
        rounded-full shadow-lg transition-all duration-300 focus:outline-none`}>
        <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-5 w-5"
       viewBox="0 0 20 20"
       fill="currentColor"
       >
        <path
       fillRule="evenodd"
       d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l3.293-3.293-3.293-3.293a1 1 0 011.414-1.414l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 010 1.414z"
       clipRule="evenodd"
       />
      </svg>
      </button>
    </div>
  )
}

export default ScrollToTop
