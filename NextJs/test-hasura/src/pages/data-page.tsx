import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { gradientBgPurplePink } from '../utils/colors'
import { getPageTitle } from '../utils/config'
import { useAppDispatch } from '../stores/hooks'
import LayoutAuthenticated from '../layouts/Authenticated'
import fetchApi from '../hooks/fetchApi'

                              // <------get data starts------>

// const gqlQuery = {
//   query: `
//        {
//           customers {
//               created_at
//               email
//               id
//               name
//               updated_at
//           }
//       }       
//     `
// }

                              // <------get data ends------>


                              // <------post data starts------>

const info = {
  "object": {
    "email": "john6@gmail.com",
    "name": "john4"
  }
}

const gqlQuery = {
  query: `
    mutation MyMutation($object: customers_insert_input = {}) {
      insert_customers_one(object: $object, on_conflict: {constraint: customers_pkey}) {
        created_at
        email
        id
        name
        updated_at
      }
    }      
    `,
  variables: info,
}

                                // <------post data ends------>

                                // <------delete data starts--->

                                
// const gqlQuery = {
//   query: `
//       mutation MyMutation {
//         delete_customers(where: {name: {_eq: "john4"}}) {
//           returning {
//             name
//             email
//           }
//         }
//       }     
//     `
// }
                      
                                // <------delete data ends------>


const DataPage = () => {

  const [enabled, setEnabled] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnabled(true)
  }

  fetchApi(gqlQuery, enabled)


  return (
    <>
      <Head>
        <title>{getPageTitle('DataPage')}</title>
      </Head>
      <div className='h-screen w-screen grid justify-center items-center'>
        <div>
          <p>DataPage page</p>
          <button className='bg-red-500 py-2 px-6 rounded text-white mt-5' onClick={handleSubmit}>Add Post</button>
        </div>
      </div>
    </>
  )
}

DataPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}
export default DataPage



// export async function getServerSideProps(context: any) {

// const data = await fetchApi(graphqlQuery)

// console.log(data.data)

// return {
//   props: { }
// }
// }







