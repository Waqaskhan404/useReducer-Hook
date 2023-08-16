import React, { useReducer } from 'react'



let initialState={
    data:[],
    loading:false,
    error:null
}
const reducer=(state,action)=>{
    console.log(state,action)
    switch(action.type){
        case "DATA_FETCH_START":{
            return {...state,loading:true}
        }
        case "DATA_FETCH_SUCCESSFULLY":{
            return {loading:false,error:null,data:action.payload}
        }
        case "FETCHING_FAILED":{
            return {...state,loading:false,error:action.payload}
        }
    }

}

const UseReducerEx = () => {
  


    const [state,dispatch]=useReducer(reducer,initialState);


    const fetchData=async()=>{
        dispatch({type:"DATA_FETCH_START"});
        try{
            const response=await fetch("https://jsonplaceholder.typicode.com/posts");
            const data=await response.json();
            // console.log(data)
            dispatch({type:"DATA_FETCH_SUCCESSFULLY",payload:data})
        }catch(error){
            // console.log(error)
            dispatch({type:"FETCHING_FAILED",payload:error.message})
        }

        



        
    }
  return (
    <>
    <h1>UseReducerEx</h1>
    <button onClick={fetchData}>Fetch Data</button>

    {state.loading &&  <p>Loading....</p>}
    {state.error && <h3>Error :{state.error}</h3>}
    <ul>
        {state.data.map((items)=>{
            return <li key={items.id}>{items.title}</li>
        })}
    </ul>

    </>
  )
}

export default UseReducerEx