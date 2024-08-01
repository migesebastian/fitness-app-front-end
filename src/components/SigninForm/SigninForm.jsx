import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './Signin.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (

    <body1>
        
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" > Username: </label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button class="sigin" type="submit">Sign In</button>
          <Link to="/">
            <button class="sigin" type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
    <div class="text-wrapper">
        <p2>
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
        </p2>
        <p2>
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
        </p2>
      </div>

      <div className="membership-box">
          <h1><span>ALL-IN</span> MEMBERSHIP</h1>
          <ul>
            <li>
              <i className="fa-regular fa-circle-check"></i> Unlimited access to the
              Avci-Gym app with hundreds of workouts and programs
            </li>
            <li>
              <i className="fa-regular fa-circle-check"></i> 50% discount on Yanga
              Sports Water
            </li>
            <li>
              <i className="fa-regular fa-circle-check"></i> Unlimited use of the
              massage chairs in the club
            </li>
            <li>
              <i className="fa-regular fa-circle-check"></i> Special app with 100+
              cycling workouts
            </li>
            <li>
              <i className="fa-regular fa-circle-check"></i> Free access to the GXR
              Live Group Classes
            </li>
            <li>
              <i className="fa-regular fa-circle-check"></i> A top quality Smart
              Bike at your home (rental)
            </li>
          </ul>
          <div className="price">$49.99 <span>/per-month</span></div>
        
          <Link to="/signup">
          <button class="sigin" type="submit">Sign Up</button>
         </Link>
        
        </div>

    </body1>
    

    
  );
};

export default SigninForm;
