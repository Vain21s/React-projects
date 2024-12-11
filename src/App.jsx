import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]=useState(20);
  const[numberAllowed,SetNumberAllowed]=useState(false)
  const[charAllowed,SetCharAllowed]=useState(false)
  const[password,setPassword]=useState('')

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "123456789"
    if(charAllowed) str +="!@#$%^&*()_+"

    for( let i=1;i<length;i++)
    {
      const char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,charAllowed])


  const copyPasswordToClipboard = () =>
  {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.sleect()
  }


  useEffect(()=>{

    generatePassword()

  },[length,numberAllowed,charAllowed])

  

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 '>
      <h1 className='text-white text-center my-3'> Password Generator </h1>
      <div className='flex-shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="Password" 
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-cnter gap-x-1'>
         <input 
         type='range' 
         min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e) =>setLength(e.target.value)}
         name=""
         id=""/>
         <label htmlFor='length'>Lenght:{length}</label>
        </div>
        <div className='flex items-cnter gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        onChange={() => {SetNumberAllowed((prev) =>!prev)}}
        name="
        id="/>
        <label htmlFor='number'>Numbers</label>
        
        </div>
        <div className='flex items-cnter gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        onChange={() => {SetCharAllowed((prev) =>!prev)}}
        name="
        id="/>
        <label htmlFor='charInput'>Characters</label>
        
        </div>


      </div>
     </div>
    </>
  )
}

export default App
