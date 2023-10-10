import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1},
  { field: 'task_name', headerName: 'Task', flex: 1},
  { field: 'due_date', headerName: 'Due Date', flex: 1},
  { field: 'created_at', headerName: 'Created At', flex: 1},
  { field: 'updated_at', headerName: 'Updated At', flex: 1}
];


function App() {
 
  const [tasks, setTasks] = useState([])

  const [renderAgain, setRenderAgain] = useState(false)

  useEffect(()=>{
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:8081/api/private",{
        method: "GET",
        headers: {
          "Cache-Control": "no-cache"
        }
        
      })


      const data = await res.json()

      console.log(await res.status);
      setTasks(p=>data)
    }

    fetchTasks()
  },[renderAgain])

  return (
    <div className="">
      <button onClick={()=>setRenderAgain(p=>!p)}> Re Render </button>
     <DataGrid
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[100,1000]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default App;
