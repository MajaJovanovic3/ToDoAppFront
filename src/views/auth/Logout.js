import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  sessionStorage.removeItem('user');
  dispatch({ type: 'REMOVE_USER' });
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    console.log(user);
    navigate('/app/dashboard');
    alert('You have successfully logged out!');
  }, []);
  return null;
};
export default Logout;
