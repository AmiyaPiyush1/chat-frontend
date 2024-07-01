import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const [form, setForm] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  
  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const handleChange1 = (e) => {
    setPassword(e.target.value);
  };

  const submit = async (e) => {
    
    e.preventDefault();
    if (!form) {
      alert("Please choose a username");
    } else {
      localStorage.setItem('user', form);
      localStorage.setItem('image', 'https://picsum.photos/id/237/200/300');
      localStorage.setItem('password', password);
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3001/user_name', { form, password });
        alert("Signup successful, press ok to continue");
        navigate("/chat");
        setLoading(false);
      } catch (error) {
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
          setLoading(false);
        } else {
          alert(`Error: ${error.message}`);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className='h-screen flex justify-center items-center bg-blue-300'>
      <div className="bg-gray-200 flex justify-center rounded-lg mt-10 flex-col p-5" style={{ height: '400px', width: '300px' }}>
        <div className="font-bold mb-4 text-center">WELCOME</div>
        <form className="flex flex-col items-center" onSubmit={submit}>
          <input
            className="border-2 border-blue-800 h-8 w-full mb-4 rounded-lg px-2"
            placeholder='Enter a username'
            value={form}
            onChange={handleChange}
          />
          <input
            className="border-2 border-blue-800 h-8 w-full mb-4 rounded-lg px-2"
            placeholder='Enter password'
            type='password'
            value={password}
            onChange={handleChange1}
          />
         {loading?(
          <div className="bg-blue-500 text-white rounded-lg h-8 w-full flex justify-center items center"><div className="flex justify-center items-center text-white">Loading...</div></div>
         ):(<button
            className="bg-blue-500 text-white rounded-lg h-8 w-full"
            type="submit"
          >
            Sign Up
          </button>)}
          
          <div className="text-sm mt-3">
            Already have an account?
            <button onClick={() => navigate("/login")} className='text-blue-800'> LogIn</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
