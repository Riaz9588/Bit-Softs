import React, { ReactNode } from 'react'
import Image from 'next/image'
import logo from '../../public/images/logo.png'
import { containerMaxW } from '../utils/config'
import { gradientBgPurplePink } from '../utils/colors'

// type Props = {
//   children: ReactNode
// }

export default function FooterBar() {
  const year = new Date().getFullYear()

  return (
    <footer className={`py-2 px-6 ${gradientBgPurplePink}`}>
      <div className={`block md:flex items-center justify-between  ${containerMaxW}`}>
        <div className="text-center md:text-left mb-6 md:mb-0">
          <b>
            &copy;{year},{` `}
            <a href="#" rel="noreferrer" target="_blank">
              Boilerplate
            </a>
          </b>
        </div>
        <div className="md:py-2">
          <a href="#" rel="noreferrer" target="_blank">
            <Image alt="logo" className="w-6 h-6" src={logo}></Image>
          </a>
        </div>
      </div>
    </footer>
  )
}
