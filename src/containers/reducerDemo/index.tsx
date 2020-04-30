import React, { useReducer, useRef } from 'react'


const ReducerDemo = () => {
  const inputRef: React.MutableRefObject<any> = useRef();
  const [items, dispatch] = useReducer((state, action)=> {
      switch(action.type){
          case 'add':
              return [...state,
                  {
                      id:state.length,
                      name:action.name
                  }]
              }
  },[])
  
  function handleSubmit(event){
      event.preventDefault();
      dispatch({
          type:'add',
          name: inputRef.current.value
      });
       inputRef.current.value = '';
  }
  
  return (
      <>
          <form onSubmit={handleSubmit}>

              <input ref={inputRef}/>
          </form>
          <ul>
              {items.map(item => (
                  <li key={item.id}>{item.name}</li>
              ))}
          </ul>
      </>
  )
}



export default ReducerDemo
