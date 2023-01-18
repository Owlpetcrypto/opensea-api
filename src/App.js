import './App.css'
import { ethers } from 'ethers'
import { useState } from 'react'

function App() {
  const [account, setAccount] = useState('')
  const [data, setData] = useState([])

  console.log(data)

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let res = await provider.send('eth_requestAccounts', [])
    setAccount(res[0])
    getData(res[0])
  }

  const getData = (_account) => {
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    fetch(
      // `https://api.opensea.io/api/v1/assets?owner=${_account}&order_direction=desc&limit=20&include_orders=false`,
      // options,
      'https://api.opensea.io/api/v1/collection/vaynersports-pass-vsp',
      options,
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.collection)
        console.log(response)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="App">
      <button onClick={connect}>Connect</button>
      <p>{account}</p>
      {/* <div>
        {data.map((nft) => {
          return (
            <div>
              <p>{nft.name}</p>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default App
