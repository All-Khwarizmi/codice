import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen bg-gray-400 h-10'>
      <div className='flex h-full space-x-5 flex-row justify-center items-center'>
        <Link href={"./"}>
          <p className="uppercase">Home</p>
        </Link>
        <Link href={"./technos"}>
          <p className="uppercase"> Technos</p>
        </Link>
      </div>
        <Link href={"./decks"}>
          <p className="uppercase"> Decks</p>
        </Link>
    </nav>
  );
}

export default Navbar