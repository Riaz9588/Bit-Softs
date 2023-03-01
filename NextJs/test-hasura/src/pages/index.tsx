import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { gradientBgPurplePink } from '../utils/colors'
import { getPageTitle } from '../utils/config'
import { useAppDispatch } from '../stores/hooks'
import LayoutAuthenticated from '../layouts/Authenticated'

const Index = () => {
  const dispatch = useAppDispatch()
  
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{getPageTitle('Homepage')}</title>
      </Head>
      <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
        <p>Index page</p>
      </div>
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Index





