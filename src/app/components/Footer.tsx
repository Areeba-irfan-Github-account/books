import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className="bg-gray-900 text-white py-4 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h2 className="text-lg font-semibold">Stay Connected</h2>
        <p className="text-sm">Follow us on social media for the latest updates.</p>
        <div className="flex mt-2">
          <a href="#" className="mr-4 hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="mr-4 hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="mr-4 hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div className="text-sm">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </div>
    </div>
  )
}

export default Footer