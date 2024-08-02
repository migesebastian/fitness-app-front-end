import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <body className="body1" >
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            id="passwordConf"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="sigin" type="submit" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <Link to="/">
            <button className="sigin" type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>

    <div className="text-wrapper">
    <p className="p2">
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
          
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
        </p>

      </div>

<div id="services">
<div className="services-container">
  <h1>FITNESS WITH THE AVCI GYM CERTAINTIES</h1>
  <div className="services-list">
    <div className="services-list">
      <ul1>
        <li>
          From beginners to advanced: we make sure you keep exercising .
        </li>
        <li>
          A personal coach who can always help with training and/or
          questions. As often as you want .
        </li>
        <li>
          Personal training schedules , measurements and professional
          guidance .
        </li>
        <li>
          Lots of different live group lessons with coach (+ virtual
          lessons).
        </li>
      </ul1>
    </div>
    <div className="services-list">
      <li>
        Unique ProFit Gym app : schedule an appointment with your coach,
        book a group lesson, follow your results and have your training
        schedule at hand 24/7 .
      </li>
      <li>
        Train with the high-end equipment and materials from Hammer
        Strength and LifeFitness.
      </li>
      <li>
        Almost always open, unlimited sports and 1 fixed all-in price .
      </li>
    </div>
  </div>
</div>
</div>
</body>
  );
};

export default SignupForm;
