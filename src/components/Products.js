import React, { useState, useEffect } from "react";
import Item from "./Item";
import p from "../products.json";
import Spinner from "./Spinner";

function Products(props) {
  const productsPerPage = 8;
  const [products, setproducts] = useState([]);
  const [allproducts, setallproducts] = useState(p.products);
  const [currpage, setpage] = useState(1);
  const lastidx = currpage * productsPerPage;
  const firstidx = lastidx - productsPerPage;
  const npages = Math.ceil(allproducts.length/8);
  const numbers = [...Array(npages+1).keys()].slice(1);
  const [load,setload] =  useState(true);
  
  const loadproducts = (firstidx,lastidx) => {
    setload(true);
    setproducts(allproducts.slice(firstidx,lastidx));
    setload(false);
  };
  useEffect(() => {
    loadproducts(firstidx,lastidx);
    // eslint-disable-next-line
  }, []);
  
  const sortL2H = () =>{
    setload(true);
    setpage(1);
    const p = [...allproducts];
    p.sort((a, b) => a.price - b.price);
    setallproducts(p);
    const lastidx = productsPerPage;
    const firstidx = lastidx - productsPerPage;
    setproducts(p.slice(firstidx,lastidx));
    setload(false);
  }
  const sortH2L = () =>{
    setload(true);
    setpage(1);
    const p = [...allproducts];
    p.sort((a, b) => b.price - a.price);
    setallproducts(p);
    const lastidx = productsPerPage;
    const firstidx = lastidx - productsPerPage;
    setproducts(p.slice(firstidx,lastidx));
    setload(false);
  }

  const prevpage = () =>{
    if(currpage!==firstidx)
    {
      setpage(currpage-1);
      const lastidx = (currpage-1) * productsPerPage;
      const firstidx = lastidx - productsPerPage;
      loadproducts(firstidx,lastidx);
    }
  }
  const changecurrpage = (i) =>{
    setpage(i+1);
    const lastidx = (i+1) * productsPerPage;
    const firstidx = lastidx - productsPerPage;
    loadproducts(firstidx,lastidx);
  }
  const nextpage = () =>{
    if(currpage!==lastidx)
    {
      setpage(currpage+1);
      const lastidx = (currpage+1) * productsPerPage;
      const firstidx = lastidx - productsPerPage;
      loadproducts(firstidx,lastidx);
    }
  }
  return (
    <div className="">
      <div className="container">
        <div className="" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flex:"50%"
          }}
        >
          <h2 style={{padding: "0px 5px"}}>List of Products:</h2>
        </div>
        <div className="" style={{display:"flex",flexDirection:"row",flex:"50%",justifyContent:"center"}}>
          <div className="dropdown">
            <div className="dropdownbtn">Sort by :</div>
            <div className="dropdown-menu">
              <div className="" style={{display:"flex",flexDirection:"column"}}>
                <button className="dropdown-tab" onClick={sortL2H}>Sort by: lower to higher Price</button>
                <button className="dropdown-tab" onClick={sortH2L}>Sort by: higher to lower Price</button>
              </div>
            </div>
          </div>
        </div>
          </div>
      </div>

      <div className="products">
        {load && <Spinner/>}
        <div className="list">
          {!load && products.map((product) => {
            return <Item key={product.id} product={product} />;
          })}
        </div>
      </div>

      <div className="container" style={{padding:"vh 0px"}}>
        <div className="pagination" id="pagination">
          <li className="page-item prev-page" style={{display:(currpage===1)?"none":""}}>
            <a href="#" className="page-link" onClick={() => {
              prevpage();
            }}>Prev</a></li>

            {numbers.map((n,i)=>( 
              <li className={`page-item curr-page ${(currpage-1===i)?"active":""}`} key={i} onClick={()=>{changecurrpage(i)}}><a href="#" className="page-link">{n}</a></li>
              ))}
          
          <li className="page-item next-page" style={{display:(currpage===numbers.length)?"none":""}}>
            <a href="#" className="page-link"
            onClick={() => {
              nextpage();
            }}>Next</a></li>
        </div>

      </div>
    </div>
    
  );
}

export default Products;
