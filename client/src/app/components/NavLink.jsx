import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children, onClick }) => {
  return (
    <Link onClick={onClick} className="text-2xl font-bold hover:text-secondary-1 transition-all duration-150" href={href}>{children}</Link>
  )
}

export default NavLink