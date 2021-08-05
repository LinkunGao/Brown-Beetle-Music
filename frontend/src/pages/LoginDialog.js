import styles from '../css/LoginRegisterDialog.module.css';
import { useContext, useState } from 'react';
import Modal from '../components/Modal';
import { Button, TextField, Typography } from '@material-ui/core';
import {AppContext} from '../AppContextProvider';
import { useHistory } from 'react-router';

export default function LoginDialog({onCancelLogin}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasErrors, setHasErrors] = useState(false);
    const history = useHistory();
    const isError = (condition) => hasErrors && condition;
    const {user,setUser, login, setTrueUser} = useContext(AppContext);
    async function handleOnLogin(username, password){
        
        setHasErrors(true);
        if(username.length>0&&password.length>0){
            
           const response = await login(username, password);
           setUser(response);
        }
    }

    //  handle user click the register button
    function handleOnRegister(){
        history.replace('/pages/register')
    }
    // handle if there is no error  then log in
    function handleUserError(){
        if(user!=="username error"&&user!=="password error"&&user!==null){
            setTrueUser(user);
            history.replace('/pages/MainMusic');
        }
    }
    handleUserError();

    function handleEnter(e){
        if(e.code==='Enter'){
            handleOnLogin(username, password);
        }
    }

    return (
        <Modal style={{ width: '60%', height: 'auto' }} dismissOnClickOutside={true} onCancel={onCancelLogin}>
            <Typography variant="h5" > Welcome to The Ultimate One</Typography>
            <div className={styles.form}>
                <div className={styles.formRow}>
                    <TextField 
                        autoFocus
                        margin="normal"
                        id="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={(user==="username error")?true:isError(username.length === 0)}
                        helperText={(user==="username error")?"No user account, please register":isError(username.length === 0) && "Please enter your username!"}
                    />
                </div>
                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyUp={handleEnter}
                        error={(user==="password error")?true:isError(password.length===0)}
                        helperText={(user==="password error")?"Incorrect password, please retry":isError(password.length===0)&& "Please enter your password!"}
                    />
                </div>
                <div className={styles.formRow} style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                    <Button 
                     variant="contained" 
                     style={{marginRight:3}}
                     onClick={() => handleOnLogin(username, password)}>
                        Login
                    </Button>
                    <Button
                    variant="contained"
                    tyle={{marginLeft:3}}
                    onClick={()=>handleOnRegister()}
                    >
                        Register
                    </Button>
                    
                </div>
            </div>
        </Modal>
    );
}