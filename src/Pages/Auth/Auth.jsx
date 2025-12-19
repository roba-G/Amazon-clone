import React, { useState } from 'react'
import style from './signup.module.css'
import { Link } from 'react-router-dom'
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Auth() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const authHandler = async (e) => {
  e.preventDefault();

  if(e.target.name == 'signin') {
  
  signInWithEmailAndPassword(auth, email, password).then((userInfo) => {console.log(userInfo)}).catch((err) => {
    console.log(err);
  })
  }
  else {
    createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {console.log(userInfo)}).catch((err) => {
      console.log(err);
    })

  }
}

  return (
    <section className={style.login}>
      <Link to="">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={style.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)}  type="password" id="password" />
          </div>
          <button className={style.login_signInButton} onClick={authHandler} name='signin'>Sign In</button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button className={style.login_registerButton} onClick={authHandler} name='signup'>
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth
