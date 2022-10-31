import { backendRoot } from "../backendInfo";
import Cookies from 'universal-cookie';

const manager = {

    getTable: (setTable, setLoader) => {
      fetch(`${backendRoot}/peopledb/table`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.ok) return res.json();
        else throw "An Error Occured";
      })
      .then((data) => {
        console.log("DEBUG :TABLE API CALL", data);
        setTable(data);
        setLoader(false);
      })
      .catch((error) => {
        // setErrorMessage(error)
        console.log(error);
      });
    },

    getToken: (email, password, setLoader, setErrorMessage) => {
      const cookies = new Cookies();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      fetch(`${backendRoot}/peopledb/token/`, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData,
      })
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Fill all fields or invalid credentials";
      })
      .then((data) => {
        console.log("DEBUG :TOKEN API CALL", data);
        cookies.set('token', data['access']);
        // setLoader(false);
      })
      .catch((error) => {
        setErrorMessage(error)
        console.log(error);
        setLoader(false);
      });
    },

    register: (fname,lname,email,password,password2,setLoader,setFlag,setErrorMessage) => {
      // const cookies = new Cookies();
      const formData = new FormData();
      formData.append("username", email)
      formData.append("first_name", fname);
      formData.append("last_name", lname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      fetch(`${backendRoot}/peopledb/register/`, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData,
      })
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Fill all fields or try a different email";
      })
      .then((data) => {
        console.log("DEBUG :RESGISTER API CALL", data.email);
        setErrorMessage("User registsred succesfuly. Sign in to continue")
        // setLoader(true)
        setFlag(true)
        // cookies.set('token', data['access']);
        // setLoader(false);
      })
      .catch((error) => {
        setErrorMessage(error)
        console.log(error);
        setLoader(false);
      });
    },
};

export default manager;