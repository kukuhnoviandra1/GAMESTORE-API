import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function UserLogin({userLogin, getToken}) {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const URL = "http://localhost:3000";
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault()
        loginUser()
    }

    const loginUser = async () => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL}/users/login`,
                data: user
            })
            const access_token = result.data["access_token"]
            // console.log(access_token)
            userLogin(true);
            getToken(access_token);
            Swal.fire(
              `Welcome Back!`,
              'You are now logged in!',
              'success'
          );
          history.push('/');
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    return (
        <div>
            <h1 className="space-enter text-center text-light">Log In</h1>
            <div className="container container-form">
                <form className="row g-3 space-enter">
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="email" onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Ex: tes123@email.com"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Password: </label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Password"/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Submit</button>
                </form>
                <p className="text-light space-enter">
                    Don't have an account? Register
                    <Link to="/users/register"> here</Link>
                    !
                </p>
            </div>
        </div>
    )
}

export default UserLogin
