import {useState} from 'react';
import axios from "axios";

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async ()=>{
    try{
        const response=await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                email,
                password
            }
        );
        console.log(response.data);
    }
    catch(error){
    console.error(error);
    }
  }

  return(
    <div style={{padding:"50px"}}>
        <h1>Login</h1>
        <input
        type="email"
        placeholder="Enter EMail"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}

        />
        <br/> <br/>
        <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e)=>
            setPassword(e.target.value)
        }/>
        <br/><br/>
        <button onClick={handleLogin}>
            Login
        </button>
    </div>
  )
}

export default Login;