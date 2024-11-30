import React, { useState } from 'react';
import Logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, cnic, email, password, confirmPassword } = formData;

    // CNIC validation: must be exactly 13 digits
    const cnicPattern = /^\d{13}$/;
    if (!cnicPattern.test(cnic)) {
      alert('CNIC must be exactly 13 digits');
      return;
    }

//     if (fullName && cnic && email && password && confirmPassword) {
//       if (password === confirmPassword) {
//         // Proceed to the Dashboard page if all fields are filled
//         navigate('/Dashboard');
//       } else {
//         alert('Passwords do not match');
//       }
//     } else {
//       alert('Please fill out all fields');
//     }
//   };



  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!passwordPattern.test(password)) {
    alert('Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one special character, and one number.');
    return;
  }

  if (fullName && cnic && email && password && confirmPassword) {
    if (password === confirmPassword) {
      // Proceed to the Dashboard page if all fields are filled
      navigate('/Dashboard');
    } else {
      alert('Passwords do not match');
    }
  } else {
    alert('Please fill out all fields');
  }
};


  return (
    <div className='w-[100vw] min-h-screen bg-background-blue flex flex-col items-center justify-center gap-[20px]'>
      <img src={Logo} alt="Logo" className="w-[80px]" />
      <div className="bg-login flex flex-col gap-[5px] px-[20px] items-center justify-center py-[10px] rounded-[10px]">
        <h2 className='text-white'>Sign Up</h2>
        <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your name"
              required
              className='input bg-input-color'
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="cnic">CNIC</label>
            <input
              type="number"
              id="cnic"
              placeholder="Enter your cnic"
              required
              className='input bg-input-color'
              value={formData.cnic}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className='input bg-input-color'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className='input bg-input-color'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              className='input bg-input-color'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn w-[100%] h-[45px] bg-blue-500 flex justify-center items-center rounded-[5px]"
          >
            Sign Up
          </button>
          <Link to="/" className="link text-blue-500">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
