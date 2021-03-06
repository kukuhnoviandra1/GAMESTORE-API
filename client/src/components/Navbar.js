import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DropdownButton, Dropdown } from 'react-bootstrap'

function Navbar({login, userLogin}) {
    const history = useHistory();

    const logoutHandler = (e) => {
        e.preventDefault();
        userLogin(false);
        localStorage.clear();
        history.push('/');
    }

    const actionHandler = (e) => {
        e.preventDefault();
        Swal.fire(
            'Not Allowed!',
            `You need to be logged in first.`,
            'error'
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/">Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {
                                    login ?
                                    <Link className="nav-link text-light" to="/cart">Cart</Link>
                                    :
                                    <Link className="nav-link text-light" to="#"
                                    onClick={e => actionHandler(e)}>
                                        Cart
                                    </Link>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    login ?
                                    <Link className="nav-link text-light" to="/line-item">Line Item</Link>
                                    :
                                    <Link className="nav-link text-light" to="#"
                                    onClick={e => actionHandler(e)}>
                                        Line Item
                                    </Link>
                                }
                            </li>
                            <li className="nav-item">
                                {
                                    login ?
                                    <Link className="nav-link text-light" to="/order">Order</Link>
                                    :
                                    <Link className="nav-link text-light" to="#"
                                    onClick={e => actionHandler(e)}>
                                        Order
                                    </Link>
                                }
                            </li>
                        </ul>
                        <DropdownButton title="Account" variant="dark" menuVariant="dark">
                            {
                                login ?
                                    <>
                                        <Dropdown.Item style={{ padding:"0px", margin:"0px" }}>
                                            <Link className="nav-link text-light" to="/user/profile">Profile</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item style={{ padding:"0px", margin:"0px" }}>
                                            <button className="btn nav-link text-light"
                                            onClick={e => logoutHandler(e)}>Logout</button>
                                        </Dropdown.Item>
                                    </>
                                    
                                    :
                                    <>
                                        <Dropdown.Item style={{ padding:"0px", margin:"0px" }}>
                                            <Link className="nav-link text-light" to="/users/register">Register</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item style={{ padding:"0px", margin:"0px" }}>
                                            <Link className="nav-link text-light" to="/users/login">Log In</Link>
                                        </Dropdown.Item>
                                    </>
                            }
                        </DropdownButton>
                        
                        {/* {
                            login ?
                            <button className="nav-link text-dark button btn btn-danger"
                            onClick={e => logoutHandler(e)}>Logout</button>
                            :
                            <Link className="nav-link text-dark button btn btn-info" to="/users/login">Log In</Link>
                        } */}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
