import {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
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
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
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