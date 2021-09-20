import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./Modal.css";

function ModalUserEdit({ setOpenModal, username, gender, birthdate, type, avatar}) {
    const [user, setUser] = useState({
        name: username,
        birthdate: birthdate,
        gender: gender,
        avatar: avatar,
        type: type
    });

    const submitHandler = (e) => {
        e.preventDefault();
        updateUser()
    }

    const updateUser = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            let newUser = new FormData();

            newUser.append("name", user.name);
            newUser.append("birthdate", user.birthdate);
            newUser.append("gender", user.gender);
            newUser.append("avatar", user.avatar);
            newUser.append("type", user.type);

            await axios ({
                method: 'PUT',
                url: `http://localhost:3000/users/update/`,
                headers: {
                    access_token
                },
                data: newUser
            })
            Swal.fire(
                'Success',
                `Profile successfully updated!`,
                'succes'
            )
            setOpenModal(false);
        } catch (err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className="text-light" 
                        onClick={() => {setOpenModal(false)}}>
                        X
                    </button>
                </div>
                <div className="title">
                <h2>Edit {username}'s Profile</h2>
                </div>
                <div className="body">
                    <form>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Name: </label>
                            <input type="text" className="form-control" id="address" onChange={(e) => setUser({...user, name: e.target.value})} value={user.name}/>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Birth date: </label>
                            <input type="text" className="form-control" id="total_qty" onChange={(e) => setUser({...user, birthdate: e.target.value})} value={user.birthdate}/>
                        </div>
                        <div className="row mb-3">
                            <label className="form-label modal-form">Gender: </label>
                            <input type="text" className="form-control" id="address" onChange={(e) => setUser({...user, gender: e.target.value})} value={user.gender}/>
                        </div>
                        <div className="row mb-3">
                            <label className="text-light col-sm-2 col-form-label">Type: </label>
                            <div className="col-sm-10" onChange={(e) => setUser({...user, type: e.target.value})}>
                                <div className="form-check left">
                                    <input className="form-check-input " type="radio" id="type" name="type" value="admin" checked={user.type === "admin"}/>
                                        Admin
                                </div>
                                <div className="form-check left">
                                    <input className="form-check-input" type="radio" id="type" name="type" value="user" checked={user.type === "user"}/>
                                        User
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="text-light col-sm-2 col-form-label wrap">Avatar: </label>
                            <div className="col-sm-10">
                            <input type="file" className="form-control" id="avatar" name="avatar" onChange={(e) => setUser({...user, avatar: e.target.files[0]})} accept="image/*"/>
                            </div>
                        </div>
                        <div className="footer">
                            <button onClick={(e) => submitHandler(e)}>
                                Confirm
                            </button>
                            <button onClick={() => setOpenModal(false)}id="cancelBtn">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ModalUserEdit;