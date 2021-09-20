import React from 'react';
import { Link } from 'react-router-dom';

function CardProduct(props) {
    const { 
        id,
        name, 
        price, 
        stock, 
        category,  
        rating, 
        views, 
        Products_Images
    } = props.product

    return (
        <div className="col-md-3 col-3 space-enter">
            <Link to={`/products/details/${id}`} className="Link">
            <div className="card bg-dark text-white">
                    <img src=
                        {
                            Products_Images.map(image => {
                                return `http://localhost:3000/tmp/my-uploads/${image.filename}`
                            })
                        } 
                    className="card-img-top" alt="..."/>
                
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                </div>
                <ul className="list-group list-group-flush ">
                    <li className="list-group-item bg-dark text-white">Rp. {price}</li>
                    <li className="list-group-item bg-dark text-white">{category}</li>
                    <li className="list-group-item bg-dark text-white">Stock: {stock}</li>
                    <li className="list-group-item bg-dark text-white">
                        <div className="side-by-side">
                            <span>Rating: {rating}</span>
                            <span>Views: {views}</span>
                        </div>
                    </li>
                </ul>
            </div>
            </Link>
        </div>
    )
}

export default CardProduct;