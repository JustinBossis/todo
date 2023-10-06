import React from 'react';
import "./App.css"
import { v4 } from 'uuid';


function App() {
  const allItems = JSON.parse(window.localStorage.getItem("items")) || [{id: "task 1", value: "task 1"}];
  const [items, setItems] = React.useState(allItems);
  const refText = React.useRef()
  const refTime = React.useRef()

  function addItem() {
    setItems([...items, {id: v4(), value: refText.current.value, completed: false, completionTime: refTime.current.value}]);
  }

  const removeItem = (idToDelete) => {
    setItems(items.filter((_, id) => id !== idToDelete));
  }
  
  const validateItem = (idToUpdate) => {
    setItems(items.map((item, id) => {
      if (id == idToUpdate){
        let today = new Date();
        return {
          ...item,
          completed: true,
          completedTime: today.getHours() + ':' + (today.getMinutes()<10 ? 0 : "") + today.getMinutes()
        };
      }
      return item;
    }))
  }

  React.useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className='card' style={{width: "40rem"}}>
        <table className='table'>
          <thead style={{textAlign: "center"}}><tr><td colSpan={4}>You have {items.length} Todos</td></tr></thead>
          <tbody>
            {items.map((item, id) => (
              <tr key={item.value + id}>
                <td style={{width:"50%"}}>{item.value}</td>
                <td style={{width:"30%"}}>{item.completed ? "Complétée à "+item.completedTime: ""}</td>
                <td>{item.completed ? "" : <button type='button' onClick={() => validateItem(id)} style={{border: 0, borderRadius: "100%", width: "26px", height: "26px"}}>✓</button>}</td>
                <td><button type='button' onClick={() => removeItem(id)} style={{border: 0, borderRadius: "100%", width: "26px", height: "26px"}}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='input-group'>
          <input type='text' className='form-control' ref={refText} placeholder='Enter item' />
          <input type="time" className="form-control" ref={refTime}/>
          <button type='button' onClick={addItem} className='btn btn-outline-dark'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App
