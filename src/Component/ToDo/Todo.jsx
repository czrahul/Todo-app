import React, {useEffect, useState} from 'react';
import "./toDo.scss"
import axios from 'axios'
import AddTask from '../AddTask/AddTask';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArchiveIcon from '@mui/icons-material/Archive';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import Tooltip from '@mui/material/Tooltip';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Todo = () => {
    const [arrayData, setmethod] = useState([]);
    const [taskId, setId] = useState('');

    useEffect(() => {
        axios.get("http://localhost:4000/todo").then(function(response) {
            setmethod(response.data);

        })
    }, [])

    const handleClick = (e) => {
        setId(e);
        var ID = document.getElementById(e);
        ID.style.backgroundColor = "Aqua";
    }

    const handleDelete = (e) => {
        if(e === "true") {
            try {
                axios.post("http://localhost:4000/delete", {taskId} )
            } catch (error) {
                console.error(error)
            }
        }
        window.location.reload();
    }

    const handleArchive = (e) => {
        try {
            axios.post("http://localhost:4000/archive", {taskId} )
        } catch (error) {
            console.error(error)
        }
        window.location.reload(true);
    }

    const handleMove = (e) => {
        var ID = document.getElementById('folder');
        if(ID.style.display === "none")
            ID.style.display = "block"
        else
            ID.style.display = "none"
    }

    const sendTask = (e) => {
        try {
            axios.post("http://localhost:4000/move", {taskId, e} )
        } catch (error) {
            console.error(error)
        }
        window.location.reload(true);
    }

    return (
        <div className='todo'>
            <div className='func'>
                <Tooltip title="Archive" placement="bottom-end">
                    <button onClick={handleArchive}><ArchiveIcon/></button>
                </Tooltip>
                
                <Popup
                    trigger={
                        <Tooltip title="Delete" placement="bottom-end">
                            <button ><DeleteForeverIcon/></button>
                        </Tooltip>}
                    modal
                    nested
                >
                    {close => (
                    <div className="functional">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <h3 className="del_header"> Are you sure you want to delete the task? </h3>
                        <div className="del_content">
                            <input type="button" value="Yes" onClick={(e) => {handleDelete("true")}}/>
                            <input type="button" value="No" onClick={(e) => {handleDelete("false")}}/>
                        </div>
                    </div>
                    )}
                </Popup>

                
                <div className='movebtn'>
                    <Tooltip title="Move" placement="bottom-end">
                        <button onClick={handleMove}><DriveFileMoveIcon/></button>
                    </Tooltip>
                    <div className='selectfolder' id='folder'>
                        <li style={{pointerEvents: "none", opacity : 0.6}}><b>  To Do</b></li>
                        <li onClick={() => {sendTask("inprogress")}}><b>  In Progress</b></li>
                        <li onClick={() => {sendTask("done")}}><b>  Done</b></li>
                    </div>
                </div>
            </div>
        
            <AddTask/>
            
            <div className='taskdetails' >
                {arrayData.map((ele, i) => 
                    <div className='task'  >
                        <div id={ele.id} onClick={(e) => {handleClick(e.target.id)}}>
                            <br/>
                            <h4><b>{ele.title}</b></h4>
                            <p>{ele.description}</p>
                            <br/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Todo;