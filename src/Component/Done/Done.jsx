import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./done.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArchiveIcon from '@mui/icons-material/Archive';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Tooltip } from '@mui/material';

const Done = () => {
    const [arrayData, setmethod] = useState([]);
    const [taskId, setId] = useState('');

    useEffect(() => { 
        axios.get("http://localhost:4000/done").then(function(response) {
            setmethod(response.data);
        })
    }, [])

    const handleClick = (e) => {
        setId(e);
        var ID = document.getElementById(e);
        ID.style.backgroundColor = "Aqua";
    }

    const handleDelete = (e) => {
        try {
            axios.post("http://localhost:4000/delete", {taskId} )
        } catch (error) {
            console.error(error)
        }
        window.location.reload(true);
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
        var ID = document.getElementById('done_folder');
        if(ID.style.display === "none")
            ID.style.display = "block"
        else
            ID.style.display = "none"
    }
    
    const sendFolder = (e) => {
        try {
            axios.post("http://localhost:4000/move", {taskId, e} )
        } catch (error) {
            console.error(error)
        }
        window.location.reload(true);
    }

    return (
        <div className='done'>
            <div className='func'>
                <Tooltip title="Archive" placement="bottom-end">
                    <button onClick={handleArchive}><ArchiveIcon/></button>
                </Tooltip>
                <Tooltip title="Delete" placement="bottom-end">
                    <button onClick={handleDelete}><DeleteForeverIcon/></button>
                </Tooltip>
                <div className='movebtn'>
                    <Tooltip title="Move" placement="bottom-end">
                        <button onClick={handleMove}><DriveFileMoveIcon/></button>
                    </Tooltip>
                    <div className='done_selectfolder' id='done_folder'>
                        <li onClick={() => {sendFolder("pending")}}><b>To Do</b></li>
                        <li onClick={() => {sendFolder("inprogress")}}><b>In Progress</b></li>
                        <li style={{pointerEvents: "none", opacity : 0.6}}><b>Done</b></li>
                    </div>
                </div>
            </div>

            <div className='taskdetails' >
                {arrayData.map((ele, i) => 
                    <div className="task"  >
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
};

export default Done;