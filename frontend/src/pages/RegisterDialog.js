import Modal from '../components/Modal';
import {Typography, Button, TextField, CssBaseline} from '@material-ui/core';
import styles from '../css/LoginRegisterDialog.module.css';
import { useContext, useState } from 'react';
import {AppContext} from '../AppContextProvider';
import axios from 'axios';
import { useHistory } from 'react-router';
import ImageUpload from '../components/ImageUpload';

export default function RegisterDialog({onCancelRegister}){

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [hasErrors, setHasErrors] = useState(false);
    const [usernameExist, setUsernameExist] = useState(false);
    const [isPasswordSame, setPasswordSame] = useState(true);
    
    const history = useHistory();

    const isError = (condition) => hasErrors && condition;

    const {register} = useContext(AppContext);

    // if there is no problem then send userinfo to backend
    async function handleOnRegister(){
        setHasErrors(true);
        const user = {
            username,
            firstName,
            lastName,
            password,
            email,
            icon:'',
            listenList: []
        }
        if(username.length>0&&firstName.length>0&&lastName.length>0&&password.length>0&&email.length>0&&image!==null&&!usernameExist&&isPasswordSame){
            const response = await register(user, image);
            if(response){
                history.replace('/pages/LoginDialog');
            }else{
                alert('There are some unknown errors hanpened in database, please change some your infomation then submit again!');
            }
        }
        
    }
    // when user onblur in username row, it will 
    //check the username is already exist or not in database automatically!
    async function handleUserExist(){
        const response = await axios.get(`/api/register/${username}`);
        if(response.data){
            setUsernameExist(true);
        }else{
            setUsernameExist(false);
        }
    }
    // to check the two input password is same or not
    function handlePasswordError(){
        if(comfirmPassword!==password){
            setPasswordSame(false);
        }else{
            setPasswordSame(true);
        }
    }

    return(
        <Modal style={{ width: '60%', height: 'auto' }} dismissOnClickOutside={true} onCancel={onCancelRegister}>
            <Typography variant="h5" > Welcome to register for The Ultimate One</Typography>
            <div className={styles.form, styles.form_register}>
                <div className={styles.formRow}>
                    <TextField 
                        autoFocus
                        margin="normal"
                        id="username"
                        label="Username"
                        type="text"
                        variant="filled"
                        fullWidth
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onBlur={handleUserExist}
                        error={usernameExist?true:isError(username.length === 0)}
                        helperText={usernameExist?"The username has already exist, please try again!":isError(username.length === 0) && "Please enter your username!"}
                    />
                </div>

                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="firstname"
                        label="FirstName"
                        type="text"
                        variant="filled"
                        fullWidth
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        error={isError(firstName.length === 0)}
                        helperText={isError(firstName.length === 0) && "Please enter your first name!"}
                    />
                </div>

                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="lastname"
                        label="LastName"
                        type="text"
                        variant="filled"
                        fullWidth
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        error={isError(lastName.length === 0)}
                        helperText={isError(lastName.length === 0) && "Please enter your last name!"}
                    />
                </div>

                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={isError(password.length === 0)}
                        helperText={isError(password.length === 0) && "The password cannot be empty!"}
                    />
                </div>

                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="comfirm-password"
                        label="Comfirm Password"
                        type="password"
                        variant="filled"
                        fullWidth
                        value={comfirmPassword}
                        onChange={e=>setComfirmPassword(e.target.value)}
                        onBlur={handlePasswordError}
                        error={!isPasswordSame||isError(comfirmPassword.length === 0)}
                        helperText={(!isPasswordSame && "The comfirm password must be same to before!")||(isError(comfirmPassword.length === 0) && "The password cannot be empty!")}
                    />
                </div>

                <div className={styles.formRow}>
                    <TextField 
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        variant="filled"
                        fullWidth
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        error={isError(email.length === 0)}
                        helperText={isError(email.length === 0) && "The email cannot be empty!"}
                    />
                </div>
                <div className={styles.formRow}>
                    <ImageUpload 
                        onChange={e => setImage(e.target.files[0])}
                        error={isError(image===null)}
                        image={null}
                        helperText={isError(image===null)&& "Please choose an image!"}
                        text = {"Choose your icon"}
                    />
                </div>
                
                <div className={styles.formRow} style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                    <CssBaseline />
                    <Button 
                     variant="contained" 
                     fullWidth
                     style={{marginTop:3}}
                     onClick={() => handleOnRegister()}>
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
        
    );
}
