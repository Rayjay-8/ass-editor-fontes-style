import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function createass(text){
  return text
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const assdefault = `Dialogue: 1,0:00:00.00,0:01:00.00,Default,,0,0,0,,{\pos(100,200)}Legend 1
Dialogue: 0,0:00:00.00,0:01:00.00,Default,,0,0,0,,{\pos(100,100)}Legend 2`

function App() {
  const [count, setCount] = useState(3)

  const [message, setMessage] = useState('');
  const [color, setColor] = useState('6666cc');

  const legendaref = useRef()

  const onRender = async (e) => {

    const keygrada = `http://localhost:3001/generate-video?color=${color}&segundos=${count}`

    console.log(`http://localhost:3001/generate-video?color=${color}&segundos=${count}`)
    const response = await fetch(`http://localhost:3001/generate-video?color=${color}&segundos=${count}`);
    // const data = await response.text();
    
    // console.log("acabou fazer f5", response)
    
    // location.reload()
    await sleep(1000)
    setMessage(keygrada+(new Date().toDateString()));

  }

  const onAddLegenda = async (e) => {

    if(!legendaref.current.value){
      return null
    }
    
    const response = await fetch('http://localhost:3001/save-dialogue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'dialogue': legendaref.current.value
      })
    });

    // const data = await response.body()
    // console.log(data)
    legendaref.current.value = legendaref.current.value
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  return (
    <>
  
      <>
      <h1>Editor de .ass</h1>

      <div className='mb-1'>
        <video controls key={message} loop autoPlay>
          <source src="public/output.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <hr></hr>
        <label htmlFor="color">Choose color:</label>
        <input type="text" id="color" value={color} onChange={handleColorChange} />
        <button onClick={() => setCount(prev => prev - 1)}>sec -</button>
        sec {count}
        <button onClick={() => setCount(prev => prev + 1)}>sec +</button>

        <button onClick={onAddLegenda}>update .ass</button>
        <button onClick={onRender}>Render</button>

      </div>

      
      <br></br>

      <textarea rows="5" cols="33" className='wfull' placeholder='texto' type='text' defaultValue={assdefault} ref={legendaref}></textarea>
      
      </>
  
    </>
  )
}

export default App
