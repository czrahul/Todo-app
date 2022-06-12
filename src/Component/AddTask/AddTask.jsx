import React, {useState} from 'react';
import axios from 'axios';
import "./addTask.scss"
import AddCardIcon from '@mui/icons-material/AddCard';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Tooltip } from '@mui/material';

const AddTask = () => {

    const [t, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = (e) => {
        try {
            axios.post("http://localhost:4000/post_task", {t, desc} )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
          <Popup
            trigger={
              <Tooltip title="Add Task" placement="bottom-end">
                <button  id='newtask' ><AddCardIcon/></button>
              </Tooltip>}
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <h1 className="newheader"> Add New Task </h1>
                <div className="content">
                    <form id='addtask' onSubmit={handleSubmit}>
                        <input type="text" value={t} onChange={(e) => {setTitle(e.target.value)}} placeholder='Title here...'/>
                        <input type="text" id='descriptions' value={desc} onChange={(e) => {setDesc(e.target.value)}} placeholder='Description here... '/>
                        <button type='submit'  id='submit'>Submit</button>
                    </form>
                </div>
              </div>
            )}
          </Popup>
            
        </div>
    );
};

export default AddTask;