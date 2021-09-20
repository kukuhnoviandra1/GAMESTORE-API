import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ModalOrder } from '../components';

function ProductDetails() {
    const params = useParams();
    const id = +params.id;
    const URL = "http://localhost:3000";
    const history = useHistory();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        expire_date: '',
        weight: 0,
        category: '',
        brand: '',
        condition: '',
        total_sold: 0,
        rating: 0,
        views: 0,
        User: {},        
        Products_Images: []
    });

    const [productImages, setProductImages] = useState({});

    const submitHandler = (e) => {
        console.log(productImages);
        e.preventDefault();

        product.Products_Images.length > 0 ?
            editProductImage()
            :
            uploadImage()
    }

    const editProductImage = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            let img = new FormData();

            img.append("image", productImages);

            console.log(img)
            
            await axios({
                method: 'PUT',
                url: `${URL}/productimages/update/${id}`,
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data"
                },
                data: img
            }) 
            Swal.fire(
                `Product updated!`,
                `Product has been successfully updated!`,
                'success'
            );
        } catch (error) {
            Swal.fire(
                `Error!`,
                `${error}`,
                'error'
            );
        }
    }

    const uploadImage = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            let img = new FormData();

            img.append("image", productImages);

            console.log(img)
            
            await axios({
                method: 'POST',
                url: `${URL}/productimages/upload/${id}`,
                headers: {
                    access_token,
                    "Content-Type": "multipart/form-data"
                },
                data: img
            }) 
            Swal.fire(
                `Product updated!`,
                `Product has been successfully updated!`,
                'success'
            );
        } catch (error) {
            Swal.fire(
                `Error!`,
                `${error}`,
                'error'
            );
        }
    }
    
    const [openModal, setOpenModal] = useState(false)
    
    useEffect(() => {
        getProductById();
        addViews();
    }, [])

    const addViews = async () => {
        try {
            await axios ({
                method: 'PUT',
                url: `${URL}/products/updateViews/${id}`
            })
        } catch (err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const getProductById = async () => {
        try{
            let result = await axios ({
                method: 'GET',
                url: `${URL}/products/${id}`
            })
            setProduct(result.data)
        } catch(err){
            Swal.fire(
                'Oops',
                `${err}`,
                'error'
            )
        }
    }

    const deleteProductHandler = (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const access_token = localStorage.getItem('access_token')
                    axios({
                        method: 'DELETE',
                        url: `${URL}/products/delete/${id}`,
                        headers: {
                            access_token
                        }
                    })
                    Swal.fire(
                        'Delete Success!',
                        `${product.name} has been deleted.`,
                        'success'
                    )
                    history.push('/');
                }
            })
        } catch(err) {
            Swal.fire(
                'Opps!',
                `${err}`,
                'error'
            )
        }
    }

    var tempExp = product.expire_date.slice().split('T');
    var exp_date = tempExp[0];
    return (
        <div>
            <div className="container">
                <div className="middle">
                    <div className="card-details col-md-3 col-3 space-enter">
                        <div className="card text-white bg-dark space-enter">
                            <img src={
                                product.Products_Images.map(image => {
                                    return `http://localhost:3000/tmp/my-uploads/${image.filename}`
                                })
                            } className="card-img-top middle" alt="..."/>
                            <h5 className="card-title middle space-enter text-center">{product.name}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-white bg-dark middle">Price: {product.price}</li>
                                <li className="list-group-item text-white bg-dark middle">Stock: {product.stock}</li>
                                <li className="list-group-item bg-dark text-white">
                                    <div className="side-by-side">
                                        <span>Rating: {product.rating}</span>
                                        <span>Views: {product.views}</span>
                                    </div>
                                </li>
                                <li className="list-group-item text-white bg-dark middle">
                                    Uploaded By: {product.User.name}
                                </li>
                                <div className="side-by-side">
                                    <Link to={`/products/edit/${id}`} className="btn btn-info btn-sm">
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteProductHandler(id)} className="btn btn-sm btn-danger">Delete</button>
                                </div>
                                <form>
                                     <div className="prod-img">
                                         <input type="file" className="form-control " id="image" name="image" 
                                         onChange={(e) => setProductImages(e.target.files[0])} 
                                            accept="image/*"/>
                                         <button type="submit" id="btn-upload" className="btn btn-sm btn-primary" onClick={(e) => submitHandler(e)}>Submit</button>
                                    </div>
                                </form>
                            </ul>
                        </div>
                    </div>
                    <div className="card-details col-md-3 col-3 space-enter">
                        <div className="card text-white bg-dark space-enter">
                            <h5 className="card-title middle space-enter text-center">Detail Product:</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-white bg-dark middle">Expire Date: {exp_date}</li>
                                <li className="list-group-item text-white bg-dark middle">Weight: {product.weight}</li>
                                <li className="list-group-item text-white bg-dark middle">Category: {product.category}</li>
                                <li className="list-group-item text-white bg-dark middle">Brand: {product.brand}</li>
                                <li className="list-group-item text-white bg-dark middle">Condition: {product.condition}</li>
                                <li className="list-group-item text-white bg-dark middle">Total Sold: {product.total_sold}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    openModal
                    &&
                    <ModalOrder setOpenModal={setOpenModal} productName={product.name} productId={product.id} productPrice={product.price} productStock={product.stock}/>
                }
                <div id="btn-buy" className="card-details card text-white">
                    <button className="btn btn-info btn-sm openModal" 
                    onClick={() => setOpenModal(true)}>
                        Order
                    </button>
                </div>

                <div className="container paragraph-box">
                    <p className="text-white space-enter text-center">
                        Description: 
                        <br/>
                        {product.desc}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
