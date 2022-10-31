import React, {useEffect} from "react";
import manager from '../../helpers/manager';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Login.css'

export default function Login(props) {
    const cookies = new Cookies();
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate()
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')

    function handleSubmit(e) {
        e.preventDefault();
        setLoader(true)
        console.log(email);
        console.log(password);
        manager.getToken(email,password,setLoader,props.setMessage)
        setTimeout(
            () => {
                console.log(cookies)
                cookies.get('token') ? navigate('/'): navigate('/signin')}, 
            10000
            );
      }
        return (
        <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            onChange={(e) => {setEmail(e.target.value);}}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            onChange={(e) => {setPassword(e.target.value);}}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Not registered <button className="btn-link" onClick={() => {navigate('/signup')}}>sign up?</button>
        </p>
        {loader ? <CircularProgress sx={{ml:10, mt:5}}/> : null} 
      </form>
        );
}