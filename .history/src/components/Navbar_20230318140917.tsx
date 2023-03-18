import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen bg-gray-400 h-10'>
      <div className='flex flex-row'>
        <Link href={"./"}>
          <p className="uppercase">Home</p>
        </Link>
        <Link href={""}>
          <p className="uppercase"></p>
        </Link>
        <Link href={""}>
          <p className="uppercase"></p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar