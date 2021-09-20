import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function LineItem() {
    const [lineItems, setLineItems] = useState([]);
    const URL = "http://localhost:3000";

    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getLineItemById();
        getOrders();
        getCarts();
        getProducts()
    }, [])

    const getOrders = async () => {
        try {
            let orders = await axios({
                method: 'GET',
                url: `${URL}/orders/`,
            })
            setOrders(orders.data)
            console.log(orders.data)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const getCarts = async () => {
        try {
            let carts = await axios({
                method: 'GET',
                url: `${URL}/shopping_carts/`,
            })
            setCarts(carts.data)
            console.log(carts.data)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const getProducts = async () => {
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`,
            })
            setProducts(products.data)
            console.log(products.data)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const getLineItemById = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            let lineItems = await axios({
                method: 'GET',
                url: `${URL}/line_items/`,
                headers: {
                    access_token
                },
            })
            setLineItems(lineItems.data)
            console.log(lineItems.data)
            console.log(access_token)
        } catch (err) {
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            status: 'cart',
            ProductId: products.id, 
            ShoppingCartId: carts.id, 
            OrderId: orders.id
        }
        addLineItem(data)
    }

    const addLineItem = async (data) => {
        try {
            const { status, ProductId, ShoppingCartId, OrderId } = data
            const access_token = localStorage.getItem('access_token')
            await axios({
                method: 'POST',
                url: `${URL}/line_items/add`,
                headers: {
                    access_token
                },
                data: { status, ProductId, ShoppingCartId, OrderId }
            }) 
            Swal.fire(
                `Line Item added!`,
                `Line Item has been successfully added!`,
                'success'
            );
            console.log(access_token)
        } catch (error) {
            Swal.fire(
                `Error!`,
                `${error}`,
                'error'
            );
        }
    }
    
    return (
        <div className="container space-enter">
            <h1 className="text-center text-light">Line Item</h1>
            <table className="table table-dark space-enter">
                <thead>
                    <tr>
                    <th className="table-dark" scope="col">Line ID</th>
                    <th className="table-dark" scope="col">Qty</th>
                    <th className="table-dark" scope="col">Status</th>
                    <th className="table-dark" scope="col">Product ID</th>
                    <th className="table-dark" scope="col">Shop ID</th>
                    <th className="table-dark" scope="col">Order Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lineItems.map((lineItem) => {
                            return (
                                <tr>
                                    <td className="table-dark">{lineItem.id}</td>
                                    <td className="table-dark">{lineItem.qty}</td>
                                    <td className="table-dark">{lineItem.status}</td>
                                    <td className="table-dark">{lineItem.ProductId}</td>
                                    <td className="table-dark">{lineItem.Shopping_CartId}</td>
                                    <td className="table-dark">{lineItem.order_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <br/>
            <h4 className="text-center text-light space-enter">Insert Line Item Manually</h4>
            <form className="row g-3 ">
                    <select className="mb-3"
                    onChange={(e) => setCarts({...carts, id: e.target.value})}>
                    <option disabled selected>Select Cart Id</option>
                    {
                        carts.map(cart => {
                            return (
                                <>
                                    <option value={cart.id}>{cart.id}</option>
                                </>
                            )
                        })
                    }
                </select>

                <select className="mb-3"
                onChange={(e) => setOrders({...orders, id: e.target.value})}>
                    <option disabled selected>Select Order Id</option>
                    {
                        orders.map(order => {
                            return (
                                <>
                                    <option value={order.id}>{order.id}</option>
                                </>
                            )
                        })
                    }
                </select>
                
                <select className="mb-3"
                onChange={(e) => setProducts({...products, id: e.target.value})}>
                    <option disabled selected>Select Product Id</option>
                    {
                        products.map(product => {
                            return (
                                <>
                                    <option value={product.id}>{product.id}</option>
                                </>
                            )
                        })
                    }
                </select>
                <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Add to Line Item</button>
            </form>

        </div>
    )
}

export default LineItem
