import React, { useReducer } from 'react'


const reducer=(state,action)=>{
    if(action.type==="inc"){
        return{
            count:state.count+1
        }
    }
    if(action.type==="dec"){
        return{
            count:state.count-1
        }
    }

}
const UseReducer = () => {

    let initialState={
        count:0
    }
  

    const [state,dispatch]=useReducer(reducer,initialState);


    const handleInc=()=>{
        dispatch({type:"inc"})

    }
    const handleIDec=()=>{
        dispatch({type:"dec"})
        
    }

  return (
    <><h1>UseReducer</h1>


   <h2>{state.count}</h2>
   <button onClick={handleInc}>+</button>
   <button onClick={handleIDec}>-</button> 
    
    </>
  )
}

export default UseReducer