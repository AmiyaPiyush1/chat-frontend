import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Ably from 'ably/promises';

const ably = new Ably.Realtime.Promise('dbUu3w.02vloA:bTcdxhB1XToibrFU9KvqpjFp1Xyo97TAG-lZAescg_I');
const channel = ably.channels.get('chat');

const MainChat = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://talk-api-kappa.vercel.app/messages');
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();

    if (!localStorage.getItem('user')) {
      navigate("/");
    }

    channel.subscribe('chat', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    return () => {
      channel.unsubscribe('chat');
    };
  }, [navigate]);

  const Name = () => {
    return localStorage.getItem('user');
  };

  const Receiver = ({ message, user }) => (
    <div className='flex items-start ml-3 mb-3'>
      <img src={'https://picsum.photos/id/237/200/300'} className='h-10 w-10 rounded-full mr-3' alt='' />
      <div>
        <div className="font-bold">{user}</div>
        <div className='border-2 border-green-800 p-2 rounded-lg bg-white'>
          {message}
        </div>
      </div>
    </div>
  );

  const Sender = ({ message }) => (
    <div className='flex items-start justify-end mr-3 mb-3'>
      <div className='text-right'>
        <div className="font-bold">{Name()}</div>
        <div className='border-2 border-green-800 p-2 rounded-lg bg-white'>
          {message}
        </div>
      </div>
      <img src={'https://picsum.photos/id/237/200/300'} className='h-10 w-10 rounded-full ml-3' alt='' />
    </div>
  );

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const send_to_DB = async (message, usernme) => {
    try {
      await axios.post('https://talk-api-kappa.vercel.app/send_to_DB', { message, usernme });
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (form.trim()) {
      const message = { message: form, usernme: Name() };
      channel.publish('chat', message);
      setForm('');
      send_to_DB(message.message, message.usernme);
    }
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate("/");
  };

  return (
    <div className='bg-green-100 h-screen flex flex-col'>
      <div className='flex justify-between items-center p-3 bg-green-200'>
        <span className='font-bold text-green-800'>Username: {Name()}</span>
        <span className='font-bold'>David Putra</span>
        <button className='font-bold bg-red-500 text-white px-3 py-1 rounded' onClick={Logout}>Log Out</button>
      </div>
      <div className='flex-grow overflow-y-auto p-3'>
        {messages.map((message, index) => (
          message.usernme === Name() ?
            <Sender key={index} message={message.message} /> :
            <Receiver key={index} message={message.message} user={message.usernme} />
        ))}
      </div>
      <form className='flex flex-col p-3 bg-green-200' onSubmit={handleSend}>
        <input
          type="text"
          className="h-12 border-2 border-blue-800 rounded-lg px-3 mb-3"
          placeholder="Type a message..."
          value={form}
          onChange={handleChange}
        />
        <button type='submit' className='bg-blue-800 text-white border-2 border-blue-800 hover:bg-blue-600 rounded-lg px-3 py-2 self-end'>
          Send
        </button>
      </form>
    </div>
  );
};

export default MainChat;
