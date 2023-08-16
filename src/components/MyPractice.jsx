import React, { useReducer } from 'react'


// Step 2: Define state and Reducer
let initialState = {
    data: [],
    loading: false,
    error: null
}

const reducer = (state, action) => {
    console.log(state, action)

    switch (action.type) {
        case "DATA_FETCH_START": {
            // return{data:[],
            //     loading:true,
            //     error:null}
            return { ...state, loading: true }
        }
        case "DATA_FETCH_SUCCESSFULLY": {
            return { loading: false, error: null, data: action.payload }
        }
        case "DATA_FETCHING_FAILED": {
            return { loading: false, error: action.payload, ...state }
        }
        case "Item Deleted": {
            return {
                ...state, data: state.data.filter((item) => (
                    item.id !== action.payload
                ))
            };
        }
        case "ADD_DATA": {
            return { ...state, //Shallow Copy Of Data
                 data: [...state.data, action.payload] } //Add new data to the copied data array or data: [...existingItems, newItem]
                };
        
    }

}


const MyPractice = () => {

    // Steps 1)
    const [state, dispatch] = useReducer(reducer, initialState)


    // Step 3 Aysnc Function with Dispatches
    const FetchData = async () => {
        dispatch({ type: "DATA_FETCH_START" });
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            dispatch({ type: "DATA_FETCH_SUCCESSFULLY", payload: data });
        } catch (error) {
            dispatch({ type: "DATA_FETCHING_FAILED", payload: error.message })
        }

    }


    const deleteItem = (id) => {
        dispatch({ type: "Item Deleted", payload: id })
    }

    const addData = (newData) => {
        dispatch({ type: "ADD_DATA", payload: newData })
    }

    return (
        <>
            <div>MyPractice</div>
            <button onClick={FetchData}>Fetch  Data</button>
            {state.loading && <p>Loading</p>}
            {state.error && <p>Error :{state.error}</p>}
            <ul>
                {state.data.map((item) => (
                    <div key={item.id}>
                        <li>{item.title}</li>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                ))}

            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                addData({
                    id: Date.now(),
                    title: e.target.title.value
                })
            }}>
                <input type='text' name="title" placeholder='add new item' />
                <button type='submit'>Add Item</button>
            </form>
        </>
    )
}

export default MyPractice