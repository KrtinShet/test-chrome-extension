import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup } from './../../app/Store/Slice/AuthSlice';

const Signuppage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log(confirmPassword, password);
      dispatch(signup({ password }));
      navigate('/', { replace: true });
    }
  };

  return (
    <div>
      <h3>SignUP</h3>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">confirmPassword</label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={onSubmitHandler}>SignUP</button>
    </div>
  );
};

export default Signuppage;
