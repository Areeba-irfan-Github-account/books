import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        
            <div className='bg-white flex justify-center items-center rounded-l-full rounded-r-full text-black mt-6 ml-4 mr-4 p-3 lg:ml-80 lg:mr-80 ring-4 ring-peach ring-opacity-50'>
                <div className='space-x-4'>
                    <Link className='hover:underline hover:text-blue-500 transition-all duration-300 ' href="/">Home</Link>
                    <Link className='hover:underline transition-all duration-300 hover:text-blue-500  ' href="/create">Add New Book</Link>
                </div>
            </div>
       
    )
}

export default Navbar