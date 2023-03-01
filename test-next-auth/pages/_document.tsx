import { signIn, signOut, useSession } from 'next-auth/react'
import { Html, Head, Main, NextScript } from 'next/document'
import LoginBtn from '../components/login-btn'

export default function Document() {
  const { data } = useSession()
  const { accessToken } = data
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
  
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <LoginBtn/>
       {/* <div>Access Token: {accessToken}</div> */}
        {/* <NextScript /> */}
      </body>
    </Html>
  )
}
