import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
}).then((res) => res.json())

const fetchApi = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify(data),
      mode: 'cors',
      'Access-Control-Allow-Origin': "*"
    }
  })
  return response
}

export const useGetAdminData = () => {
  const { data, error } = useSWR('/boilerplate/clients.json', fetcher)
  return {
    admin: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

