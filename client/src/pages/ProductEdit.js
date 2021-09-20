import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function ProductEdit() {
    const params = useParams();
    const id = +params.id;
    const [product, setProduct] = useState({
        name: '',
        desc: '',
        price: 0,
        stock: 0,
        expire_date: null,
        weight: 0,
        category: '',
        brand: '',
        condition: '',
        UserId: 0
    });

    const URL = "http://localhost:3000";
    const history = useHistory();

    useEffect(() => {
        getProductById()
        // getProductImages()
    }, [])

    const getProductById = async () => {
        try{
            let product = await axios ({
                method: 'GET',
                url: `${URL}/products/${id}`
            })
            setProduct(product.data)
        } catch(err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let item = product;

        // if () {
        //     productImages.primary === true;
        // }
        
        editProduct(item)
    }

    const editProduct = async (item) => {
        try {
            const access_token = localStorage.getItem('access_token')
            const { 
                name,
                desc,
                price,
                stock,
                expire_date,
                weight,
                category,
                brand,
                condition,
                UserId
            } = item;
            
            await axios({
                method: 'PUT',
                url: `${URL}/products/update/${id}`,
                headers: {
                    access_token
                },
                data: { 
                    name,
                    desc,
                    price,
                    stock,
                    expire_date,
                    weight,
                    category,
                    brand,
                    condition,
                    UserId
                }
            }) 

            Swal.fire(
                `Product updated!`,
                `Product has been successfully updated!`,
                'success'
            );
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="space-enter text-center text-light">Edit Product</h1>
            <div className="container">
                <form className="row g-3 space-enter">
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Name: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" onChange={(e) => setProduct({...product, name: e.target.value})} value={product.name}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Description: </label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="password" onChange={(e) => setProduct({...product, desc: e.target.value})} defaultValue={product.desc}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Price (Rp.): </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="price" onChange={(e) => setProduct({...product, price: e.target.value})} value={product.price}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Stock : </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="stock" onChange={(e) => setProduct({...product, stock: e.target.value})} value={product.stock}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Expire Date: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="expire_date" onChange={(e) => setProduct({...product, expire_date: e.target.value})} value={product.expire_date}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Weight: </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="weight" onChange={(e) => setProduct({...product, weight: e.target.value})} value={product.weight}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Category: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="category" onChange={(e) => setProduct({...product, category: e.target.value})} value={product.category}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Brand: </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="brand" onChange={(e) => setProduct({...product, brand: e.target.value})} value={product.brand}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="text-light col-sm-2 col-form-label">Condition: </label>
                        <div className="col-sm-10" onChange={(e) => setProduct({...product, condition: e.target.value})}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="new" checked={product.condition === "new"}/>
                                <label className="form-check-label text-light" for="new">
                                    New
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="second" checked={product.condition === "second"}/>
                                <label className="form-check-label text-light" for="second">
                                    Second
                                </label>
                            </div>
                            
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="condition" name="condition" value="refurbish" checked={product.condition === "refurbish"}/>
                                <label className="form-check-label text-light" for="refurbish">
                                    Refurbish
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => submitHandler(e)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit;