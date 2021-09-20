import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import CardProduct from '../components/CardProduct';

function Home({login}) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);

    const URL = `http://localhost:3000`;

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            let products = await axios({
                method: 'GET',
                url: `${URL}/products/`
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

    const actionHandler = (e) => {
        e.preventDefault();
        Swal.fire(
            'Not Allowed!',
            `You need to be logged in first.`,
            'error'
        )
    }

    const loadingProducts = () => {
        return (
            <div className="text-light bg-grey">
                <p className="text-center font-weight-bold">Loading Products.. Please Wait..</p>
            </div>
        )
    }

    return (
        <div className="container space-enter middle">
            <div className="d-flex justify-content-center">
                {
                    login ?
                    <Link to="/products/add" className="btn btn btn-info">Add New Product</Link>
                    :
                    <Link to="/users/login" className="btn btn btn-info" 
                    onClick={e => actionHandler(e)}>
                        Add New Product
                    </Link>
                }
            </div>
            <div className="container space-enter">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search Product" onChange={(e) => {setSearch(e.target.value)}}/>
                    <button className="btn btn-success" type="submit">Search</button>
                </form>
            </div>
            <div className="row card-product">
                {
                    products.length === 0 ?
                        loadingProducts()
                        :
                        products.filter(product => {
                            if (search == ""){
                                return product;
                            } else if (product.name.toLowerCase().includes(search.toLowerCase())) {
                                return product
                            }
                        }).
                        map(product => {
                            return (
                                <CardProduct key={product.id} product={product}/>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Home