import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

 
const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      margin: '1px 0',
      display: 'flex',
      alignItems: 'center',
      // width: 300,
      backgroundColor: '#e3f2fd'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default function SearchBar(){

    const classes = useStyles();
    const [searchInfo, setSearchInfo] = useState('');

    const history = useHistory();


    //when type entry on the keyboard then search
    function handleKeyDown(e){
        if(e.code==='Enter'){
            handleSearchPage();
        }
    }

    // send a Get request then jump to search page
    function handleSearchPage(){
        // window.location.href=`/pages/search/${searchInfo}`;
        // e.target.value="";
        const searchInput = document.querySelector("#searchInput");
        searchInput.value='';
        history.push(`/pages/search/${searchInfo}`);
    }

    
    return(
        <Paper  className={classes.root}>
            <InputBase
                id="searchInput"
                className={classes.input}
                placeholder="Search your music"
                onChange={e => setSearchInfo(e.target.value)}
                onKeyDown={handleKeyDown}
                
            />
            <IconButton 
             className={classes.iconButton} 
             aria-label="search"
             onClick={handleSearchPage}
             >
                <SearchIcon />
            </IconButton>

        </Paper>
    );
}