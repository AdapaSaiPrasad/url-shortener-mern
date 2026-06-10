import {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate()
  const handleRegister=async ()=>{
   
    try{
        const response=await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/register`,
            {   name,
                email,
                password
            }
        );
        console.log(response.data);
        navigate("/login");
    }
    catch(error){
    console.error(error);
    }
  }

  return(
    <div style={{padding:"50px"}}>
        <h1>Register</h1>
        <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e)=>{
            setName(e.target.value)
        }}
        />
        <br/> <br/>
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
        <button onClick={handleRegister}>
            Register
        </button>
    </div>
  )
}

export default Register;