import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  const [step,setStep] = useState(1)

  const decreament = ()=>{
     setCount  (count - step)
  }

  const increament = ()=>{
     setCount  (count + step)
  }

const handlestep1 = ()=>{
  setStep(1)
  
}
const handlestep5 = ()=>{
  setStep(5)
  
}
const handlestep10 = ()=>{
  setStep(10)
  
}
  const handlereset = ()=>{
    setCount(0)
    setStep(1)
  }
 


  return (
    <>
    <div className='card'>
    <h1>counter:{count}</h1>
      <button type="button" className="btn btn-info" >current:{step}</button><br></br>

      <button type="button" className="btn btn-danger" onClick={decreament}>decreament</button>
      <button type="button" className="btn btn-success" onClick={increament}>increament</button>
      <button type="button" className="btn btn-light" onClick = {handlereset} >Reset</button><br></br>
      <button type="button" className="btn btn-info" onClick={handlestep1}>steps:1</button>
      <button type="button" className="btn btn-info" onClick={handlestep5}>steps:5</button>
      <button type="button" className="btn btn-info" onClick={handlestep10}>steps:10</button>

</div>
    </>
  )
}

export default App
