import { useQuery } from 'react-query'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

const fetchItems = async () => {
  await sleep(500)

  const items = await import('../data/items.json')
  return items.default
}

export const useItems = () => useQuery(['items'], fetchItems)
