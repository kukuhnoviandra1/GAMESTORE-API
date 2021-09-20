import React, { useState, useEffect } from 'react';
// import {  } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Order() {
    const [orders, setOrders] = useState([]);
    const URL = "http://localhost:3000";

    useEffect(() => {
        getOrderById();
    }, [])

    const getOrderById = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            let orders = await axios({
                method: 'GET',
                url: `${URL}/orders/auth`,
                headers: {
                    access_token
                },
            })
            setOrders(orders.data)
            console.log(orders.data)
            console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }


    return (
        <div className="space-enter">
            <h1 className="text-center text-light">Order</h1>
            <table className="table table-dark space-enter text-center">
                <thead>
                    <tr>
                        <th className="table-dark" scope="col">Transc No</th>
                        <th className="table-dark" scope="col">Product</th>
                        <th className="table-dark" scope="col">Quantity</th>
                        <th className="table-dark" scope="col">Sub Total</th>
                        <th className="table-dark" scope="col">Discount</th>
                        <th className="table-dark" scope="col">Tax</th>
                        <th className="table-dark" scope="col">Total Due</th>
                        <th className="table-dark" scope="col">City</th>
                        <th className="table-dark" scope="col">Address</th>
                        <th className="table-dark" scope="col">Order Date</th>
                        <th className="table-dark" scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            orders.map((order) => {
                                var tempExp = order.created_on.slice().split('T');
                                var order_date = tempExp[0];
                                return (
                                    <tr>
                                        <td className="table-dark">{order.payt_trx_number}</td>
                                        <td className="table-dark">{order.name}</td>
                                        <td className="table-dark">{order.total_qty}</td>
                                        <td className="table-dark">Rp. {order.subtotal}</td>
                                        <td className="table-dark">Rp. {order.discount}</td>
                                        <td className="table-dark">Rp. {order.tax}</td>
                                        <td className="table-dark">Rp. {order.total_due}</td>
                                        <td className="table-dark">{order.city}</td>
                                        <td className="table-dark">{order.address}</td>
                                        <td className="table-dark">{order_date}</td>
                                        <td className="table-dark">{order.status}</td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}

export default Order
