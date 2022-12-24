import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './../../app/Store/Slice/AuthSlice';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(login({ password }));
      navigate('/', { replace: true });
    }
  };
  return (
    <div>
      <h3>Login</h3>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={onSubmitHandler}>Login</button>
    </div>
  );
};

export default LoginPage;
