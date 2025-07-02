"use client";
import React, {useState} from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavOverlay from './NavOverlay';

const NavBar = () => {
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <nav className='fixed bg-gradient-to-b from-neutral-6/100 to-neutral-6/0 w-full z-50'>
        <div className="p-4 z-100">
            {!navBarOpen && (
              <button onClick={() => {setNavBarOpen(true);}} className='cursor-pointer h-10 w-10 md:h-8 md:w-8 hover:text-secondary-1 transition-all duration-150'>
                <Bars3Icon className='h-10 w-10 md:h-8 md:w-8'/>
              </button>
            )}
        </div>
        {navBarOpen && <NavOverlay onClose={() => setNavBarOpen(false)} />}
    </nav>    
  )
}

export default NavBar