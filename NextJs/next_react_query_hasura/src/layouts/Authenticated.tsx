import React, { ReactNode, useEffect } from 'react'
import NavBar from '../components/NavBar'
import FooterBar from '../components/FooterBar'
import { setUser } from '../stores/mainSlice'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/store'

type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {

  const userState = useSelector((state: RootState) => state.main)

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
      <NavBar />
      {children}
      <FooterBar />
    </div>
  )
}
