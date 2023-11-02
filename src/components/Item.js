import React from 'react'

function Item(props) {
    const {product} = props;
  return (
        <div className="card">
            <div className="card-img">
                <img src={product.thumbnail} alt="..."></img>
            </div>
            
            <div className="card-body">
                <div className="card-tab">
                    <div className="card-title">{product.title}</div>
                </div>
                
                <div className="card-tab">
                    Desc : &nbsp;{product.description}.
                </div>              
                <div className="card-tab">
                    price : &nbsp;<span style={{color:"darkgreen",fontWeight:"600"}}>Rs.{product.price}</span>
                </div>
            </div>
            </div> 
  )
}

export default Item
