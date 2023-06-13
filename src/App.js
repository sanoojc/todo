
import './App.css';
import { useState, useEffect, useRef } from 'react'



function App() {


  const [toDo, setToDo] = useState('')
  const inputRef = useRef('null')
  const [editId,setEditId]=useState(0)
  const [toDos, setToDos] = useState(() => {
    const storedToDos = localStorage.getItem('toDos')
    return storedToDos ? JSON.parse(storedToDos) : []
  })
  useEffect(() => {
    const storedToDos = localStorage.getItem('toDos');
    if (storedToDos) {
      setToDos(JSON.parse(storedToDos));
    }
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

 

  useEffect(() => {
    inputRef.current.focus()
  })
  const edit=(id)=>{
    const editTodo= toDos.find(item=>item.id===id)
     setToDo(editTodo.text)
     setEditId(editTodo.id)

   }
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <div className="input">
        <input type="text" ref={inputRef} value={toDo} onChange={(e) => setToDo(e.target.value)} placeholder="🖊️ Add item..." />
        <i onClick={() =>
        {
        if(toDo.trim()!==''){
          const dataStrings = toDos.map(data => data.text.toLowerCase().trim())
          if (dataStrings.includes(toDo.toLowerCase().trim())) {
            alert('This todo already exists')
            return
          }
          setToDos([...toDos, { id: Date.now(), text: toDo, status: false }], setToDo(''))
        }
        if(editId){
          const editTodo=toDos.find((todo=>
            todo.id===editId))
          let updateToDo=toDos.map((item)=>
            item.id===editTodo.id
          ?
            (item={id:item.id,text:toDo,status:item.status})
          :
            (item={id:item.id,text:item.text,status:item.status})
            )
            setToDos(updateToDo)
            setEditId(0)
          
        }
           }} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((obj) => {
            return (
              <div className="todo">
                <div className="left">
                  <input onChange={(e) => {
                    setToDos(toDos.filter(obj2 => {
                      if (obj2.id === obj.id) {
                        obj2.status = e.target.checked
                      }
                      return obj2
                    }))
                  }} value={obj.status} title='complete' type="checkbox" name="" id="" />
                  <p id={obj.status?'completed':''}>{obj.text}</p>
                </div>
                <div className="right">
                  <i onClick={()=>edit(obj.id)}
                   title='edit' className="fa-regular fa-pen-to-square"></i>
                  <i onClick={()=>{
                    setToDos(toDos.filter(obj2=>obj2.id!==obj.id
                    ))
                  }}
                   title='delete' className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
export default App;
