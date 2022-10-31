import React, { useEffect } from "react";
import manager from '../../helpers/manager';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup(props){
    const [fname,setFname] = React.useState('')
    const [lname,setLname] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [password2,setPassword2] = React.useState('')
    const [loader, setLoader] = React.useState(false)
    const [flag, setFlag] = React.useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (flag){
        navigate('/signin') 
    }
    },[flag])

    function handleSubmit(e) {
        e.preventDefault();
        setLoader(true)
        console.log(fname);
        console.log(lname);
        console.log(email);
        console.log(password);
        console.log(password2);
        manager.register(fname,lname,email,password,password2,setLoader,setFlag,props.setMessage)
      }

        return (
        <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            onChange={(e) => {setFname(e.target.value);}}
            type="text"
            className="form-control"
            placeholder="First name"
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input onChange={(e) => {setLname(e.target.value);}} type="text" className="form-control" placeholder="Last name" />
        </div>
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
        <div className="mb-3">
          <input
            onChange={(e) => {setPassword2(e.target.value);}}
            type="password"
            className="form-control"
            placeholder="Enter password again"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/signin">sign in?</a>
        </p>
        {loader ? <CircularProgress sx={{ml:10, mt:5}}/> : null} 
      </form>
        );
}