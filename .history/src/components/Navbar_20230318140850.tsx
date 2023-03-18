import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen bg-gray'>
      <div>
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