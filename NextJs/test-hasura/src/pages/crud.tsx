import React, { useEffect, useState } from 'react'
import fetchApi from '../hooks/fetchApi'


function CRUD() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [enabled, setEnabled] = useState(false)
    const [triggerGetCustomers, setTrigerGetCustomers] = useState(false)
    const [triggerGetCustomer, setTrigerGetCustomer] = useState(false)
    const [customerId, setCustomerId] = useState(null)
    const [button, setButton] = useState("Add Customer")



    const getCustomers = fetchApi({
        query: `
            query MyQuery {
                customers {
                created_at
                email
                id
                name
                updated_at
                }
            }      
        `
    }, triggerGetCustomers)

    const getCustomer = fetchApi({
        query: `
        query MyQuery {
            customers_by_pk(id: ${customerId}) {
              created_at
              email
              id
              name
              updated_at
            }
          }
        `
    }, triggerGetCustomer)



    useEffect(() => {
        setTrigerGetCustomers(true)
    }, [])

    if (getCustomers.isLoading) {
        return <div className='text-2xl font-black h-screen w-screen flex justify-center items-center'>
            Loading ...
        </div>
    }

    if (!getCustomers.data || getCustomers.isError) {
        return <div className='text-2xl font-black h-screen w-screen flex justify-center items-center'>
            Something went wrong!
        </div>
    }

    // console.log(data)

    const actionHandler = (id, type, customer) => {
        if (type === "edit") {
            setName(customer.name)
            setEmail(customer.email)
            setButton("Edit")
        } else if (type === "delete") {
            alert(`Delete user id: ${id}`)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (
        <div className='bg-green-100 w-screen h-screen'>
            <div className='container mx-auto grid items-center h-screen'>
                <div>

                    <h3 className='text-3xl font-black text-center my-8 text-slate-500'>User Table</h3>

                    <div className="flex justify-center my-2">
                        <form onSubmit={submitHandler} className='flex gap-3'>
                            <input onChange={e => setName(e.target.value)} value={name} className='px-2' placeholder='Enter Name' type="text" />
                            <input onChange={e => setEmail(e.target.value)} value={email} className='px-2' placeholder='Enter Email' type="text" />
                            <button type="submit" className={`bg-orange-400 py-1 px-3 rounded text-white hover:bg-orange-500`}>Add User</button>
                        </form>
                    </div>

                    <div className="sm:rounded-lg mx-auto px-2 md:w-1/2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Create at</th>
                                    <th scope="col" className="px-6 py-3">Edit</th>
                                    <th scope="col" className="px-6 py-3">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getCustomers.data?.customers?.map(customer => (
                                        <tr key={customer.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{customer.email}</th>
                                            <td className="px-6 py-4">{customer.created_at}</td>
                                            <td className="px-6 py-4"><button onClick={() => actionHandler(customer.id, "edit", customer)} className="py-1 px-3 bg-blue-700 font-semibold text-white rounded hover:bg-blue-900 cursor-pointer">Edit</button></td>
                                            <td className="px-6 py-4"><button onClick={() => actionHandler(customer.id, "delete", null)} className="py-1 px-3 bg-red-500 font-semibold text-white rounded hover:bg-red-700 cursor-pointer">Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CRUD


