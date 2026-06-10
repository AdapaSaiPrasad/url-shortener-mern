import { Link,useNavigate } from "react-router-dom";
function Navbar(){
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");

    }
    return(
        <div
        style={
            {
                display:"flex",
                gap:"20px",
                padding:"20px",
                borderBottom:"1px solid gray"
            }
        }>
        <Link to="/">
         Home
        </Link>

              {
        token ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )
      }
        </div>
    )
}
export default Navbar;