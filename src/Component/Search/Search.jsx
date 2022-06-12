import axios from 'axios';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./search.scss"

const Searchtask = () => {

    const [skey, setKey] = useState('');

    const handleSearch = (e) => {
        try {
            axios.post("http://localhost:4000/search", {skey} )
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className='searchtask' >
            <form id='searchform' onSubmit={handleSearch}>
                <input type="text" id="searchkey" value={skey} onChange={(e) => {setKey(e.target.value)}} placeholder='Search here...'/>
                <button type='submit' id='submitbtn' ><SearchIcon/></button>
            </form>
        </div>
    );
};

export default Searchtask;