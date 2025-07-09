import React from 'react'

const Footer = () => {
  return (
    <footer className="footer z-10 bg-transparent backdrop-blur-sm border border-neutral-4 border-x-transparent border-b-transparent relative">
        <div className="w-full p-12 flex flex-col 3xl:text-lg gap-4 md:gap-0 md:flex-row justify-between">
            <a href='/impressum' className='text-neutral-1 hover:underline md:order-2'>Impressum</a>
            <a href='/datenschutz' className='text-neutral-1 hover:underline md:order-3'>Datenschutzerklärung</a>
            <p className="text-neutral-3 md:order-1">© 2025 Tilo Jäkel</p>
        </div>
    </footer>
  )
}

export default Footer