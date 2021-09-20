import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Modal.css";
import axios from 'axios';
import Swal from 'sweetalert2';

 
function ModalOrder({ setOpenModal, productName, productId, productPrice, productStock }) {
    const [order, setOrder] = useState({
        name: productName,
        subtotal: 0,
        total_qty: 0,
        city: '',
        address: '',
    });

    const URL = "http://localhost:3000";
    const history = useHistory();

    const orderHandler = async (e) => {
        e.preventDefault();
        console.log(order);
        addCart();
        addOrder();
        updateSold();
        addLineItem();
    };

    const updateSold = async () => {
        try {
            await axios ({
                method: 'PUT',
                url: `${URL}/products/updateSold/${productId}`
            })
        } catch (err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const addOrder = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            await axios({
                method:'POST',
                url: `${URL}/orders/add/`,
                headers: {
                    access_token
                },
                data: order
            });
            console.log(access_token)
            Swal.fire(
                'Success!',
                `${productName} has been added to your order list!`,
                'success'
            )
            history.push('/order');
        } catch(err) {
            Swal.fire(
                'Opps!',
                `${err}`,
                'error'
            )
        }
    }

    const addCart = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            await axios({
                method:'POST',
                url: `${URL}/shopping_carts/add/`,
                headers: {
                    access_token
                }
            });
            console.log(access_token)
        } catch(err) {
            Swal.fire(
                'Opps!',
                `${err}`,
                'error'
            )
        }
    }

    const addLineItem = async () => {
        try {
            const qty = order.total_qty;
            const ProductId = productId;
            const ShoppingCartId = 0;
            const OrderId = 0;

            const access_token = localStorage.getItem('access_token')
            await axios({
                method:'POST',
                url: `${URL}/line_items/add/`,
                headers: {
                    access_token
                },
                data: qty, ProductId, ShoppingCartId, OrderId
            });
            Swal.fire(
                'Success!',
                ``,
                'success'
            )
        } catch(err) {
            Swal.fire(
                'Opps!',
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
          <h2>Order For {productName}</h2>
          <p>Price: {productPrice}</p>
        </div>
        <div className="body">
            <form>
                <div className="row mb-3">
                    <label className="form-label modal-form">Address: </label>
                    <textarea type="text" className="form-control" id="address" onChange={(e) => setOrder({...order, address: e.target.value})}/>
                </div>
                <div className="row mb-3">
                    <label className="form-label modal-form">City: </label>
                    <select className="form-select" id="city" onChange={(e) => setOrder({...order, city: e.target.value})}>
                        <option disabled selected value> -- Select City -- </option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Depok">Depok</option>
                        <option value="Bogor">Bogor</option>
                        <option value="Bekasi">Bekasi</option>
                        <option value="Tangerang">Tangerang</option>
                    </select>
                </div>
                <div className="row mb-3">
                    <label className="form-label modal-form">Total: </label>
                    <input type="number" className="form-control" id="total_qty" onChange={(e) => setOrder({...order, total_qty: e.target.value, subtotal: productPrice * e.target.value})}/>
                    <div className="form-text modal-form">Stock: {productStock}</div>
                </div>
                <div className="footer">
                    <button onClick={(e) => orderHandler(e)}>
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
export default ModalOrder;