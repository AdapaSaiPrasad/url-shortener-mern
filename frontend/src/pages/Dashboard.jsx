import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [urls,setUrls]=useState([]);
    const [loading,setLoading]=useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate=useNavigate();
    useEffect(()=>{
        const fetchUrls=async()=>{
            try{
                const token=localStorage.getItem("token");
                setLoading(true);
                const response=await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/url/myurls`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                setUrls(response.data.data);
                setLoading(false);
            }
            catch(error){
                console.error(error);
                setLoading(false);

            }
        }
        fetchUrls();
    },[]);
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login")
    };
    const handleDelete=async(id)=>{
      try{
        const token=localStorage.getItem("token");
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/url/${id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }

        );
        setMessage("URL deleted successfully");
        setUrls(
          urls.filter((url)=>url._id!==id)
        )


      }
      catch(error){
        console.error(error);
        setError("Failed to delete URL");

      }
    };
    if (loading) {
  return <h1>Loading...</h1>;
}
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h1>My URLs</h1>
             {message && <p>{message}</p>}

    {error && <p>{error}</p>}
            {
  urls.length === 0 ? (

    <p>No URLs created yet</p>

  ) : (
    
     
    urls.map((url) => (

      <div
        key={url._id}
        style={{
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "10px",
        }}
      >

        <p>
          Original:
          {url.originalUrl}
        </p>

        <p>
          Short:
          {import.meta.env.VITE_API_URL}/{url.shortCode}
        </p>

        <p>
          Clicks:
          {url.clicks}
        </p>

        <button
          onClick={() =>
            handleDelete(url._id)
          }
        >
          Delete
        </button>
        <button
  onClick={() =>
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_API_URL}/${url.shortCode}`
    )
  }
>
  Copy
</button>

      </div>
    ))
  )
}
        </div>
    )
}
export  default Dashboard;