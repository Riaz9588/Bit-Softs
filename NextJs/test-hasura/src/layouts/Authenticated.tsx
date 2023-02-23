import React, { ReactNode, useEffect } from 'react'
import NavBar from '../components/NavBar'
import FooterBar from '../components/FooterBar'
import { setUser } from '../stores/mainSlice'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatar:
          'https://picsum.photos/300/300',
      })
    )
  })

  return (
    <div className="">
      <p>Layout Guest Starts</p>
        <NavBar></NavBar>
        <FooterBar>
        </FooterBar>
      <p>Layout Guest Ends</p>
      </div>
  )
}
