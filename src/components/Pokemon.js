import {useState, useEffect} from 'react'
import axios from 'axios'

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([])
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [offset, setOffset] = useState('')
  const [limit, setLimit] = useState('')
  useEffect(() => {
    axios.get(url)
    .then((res) => {
      console.log(res.data)
      setPokemon(res.data.results)
      setNextUrl(res.data.next)
      setPrevUrl(res.data.previous)
    })
  }, [url])
  console.log(nextUrl)
  return(
    <div>
      <input placeholder='offset' value={offset} onChange={(e) => setOffset(e.target.value)} />
      <input placeholder='limit' value={limit} onChange={(e) => setLimit(e.target.value)} />
      {prevUrl && <button onClick={() => setUrl(prevUrl)}>Go Back</button>}
      {nextUrl && <button onClick={() => setUrl(nextUrl)}>Go Next</button>}
      <button onClick={() => setUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)}>Skip ahead to somewhere</button>
      {pokemon.map((poke) => {
        return (
          <div key={poke.name}>
            {poke.name}
          </div>
        )
      })}
    </div>
  )
}

export default Pokemon