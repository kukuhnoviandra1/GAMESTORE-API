import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalUserEdit } from '../components';

function UserProfile() {
    const [user, setUser] = useState({
        name: '',
        birthdate: '',
        gender: '',
        avatar: '',
        type: ''
    });
    
    const [openModal, setOpenModal] = useState(false)
    
    const URL = "http://localhost:3000";

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try{
            const access_token = localStorage.getItem('access_token')
            let result = await axios ({
                method: 'GET',
                url: `${URL}/users/profile`,
                headers: {
                    access_token
                }
            })
            setUser(result.data)
        } catch(err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    var tempBirth = user.birthdate.slice().split('T');
    var birthdate = tempBirth[0];

    return (
        <div className="container space-enter">
            <div className="middle">
            <div className="card card-details text-white bg-dark">
                <img src={`http://localhost:3000/${user.avatar}`} className="card-img-top" alt="..."/>
                    <div className="card-body text-white bg-dark">
                        <h5 className="card-title">{user.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-white bg-dark middle">Gender: {user.gender}</li>
                                <li className="list-group-item text-white bg-dark middle">Birthdate: {birthdate}</li>
                                <li className="list-group-item text-white bg-dark middle">Type: {user.type}</li>
                                {
                                    openModal
                                    &&
                                    <ModalUserEdit setOpenModal={setOpenModal} username={user.name} gender={user.gender} birthdate={birthdate} type={user.type} avatar={user.avatar}/>
                                }
                                <button className="btn btn-info btn-sm openModal" 
                                onClick={() => setOpenModal(true)}>
                                    Edit Profile
                                </button>
                            </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
