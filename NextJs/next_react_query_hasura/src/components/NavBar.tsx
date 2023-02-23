import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import { gradientBgPinkRed } from '../utils/colors'
import { containerMaxW } from '../utils/config'


export default function NavBar() {
  const { userAvatar } = useSelector((state: RootState) => state.main)

  return (
    <nav className={`py-2 px-6 ${gradientBgPinkRed} `}>
      <div className={`${containerMaxW} flex justify-between items-center`}>
          <p className='text-2xl font-black'>Navbar</p>
          <Image className="w-10 h-10 rounded-full" alt="user-image" src="https://picsum.photos/300/300" width={20} height={20} ></Image>
      </div>
    </nav>
  )
}
