import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const login = () => {
  
    const [form, setForm] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const Routing=()=>{
    navigate("/")
  }
  const handleChange = (e) => {
    setForm(e.target.value);
  };

  
  const handleChange1 = (e) => {
    setPassword(e.target.value);
  };


  const submit = async (e) => {
    e.preventDefault();
    if (!form || !password) {
      alert("Please fill the details");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/login', { form, password });
      if (response.status === 200) {
        localStorage.setItem('user',form)
        setLoading(false)
        navigate("/chat");
      } else {
        alert("Login failed");
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        setLoading(false)
        alert(`Error: ${error.response.data.error}`);
      } else {
        setLoading(false)
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <div>
      <div className='h-screen flex justify-center items-center bg-blue-300'>
      <div className="bg-gray-200 flex justify-center rounded-lg mt-10 flex-col p-5" style={{ height: '400px', width: '300px' }}>
        <div className="font-bold mb-4 text-center">WELCOME</div>
        <form className="flex flex-col items-center">
          <input
            className="border-2 border-blue-800 h-8 w-full mb-4 rounded-lg px-2"
            placeholder='Enter a username'
            value={form}
            onChange={handleChange}
          />
          <input
            className="border-2 border-blue-800 h-8 w-full mb-4 rounded-lg px-2"
            placeholder='Enter password'
            type='Password'
            value={password}
            onChange={handleChange1}
          />
          {loading?(
            <div className="bg-blue-500 flex justify-center items-center text-white w-full rounded-lg h-8">Loading...</div>

          ):( <button
            className="bg-blue-500 text-white rounded-lg h-8 w-full"
            onClick={submit}
          >
           LogIn
          </button>)}
         
          <div className="text-sm mt-3">Don't have an account?<button onClick={Routing} className='text-blue-800'>SignUp</button></div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default login
