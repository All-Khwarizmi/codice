import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href={"./"}>
          <p className="uppercase">Home</p>
        </Link>
        <Link href={""}>
          <p className="uppercase"></p>
        </Link>
        <Link href={""}>
          <p></p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar