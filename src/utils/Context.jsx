import React, { createContext, useEffect, useState} from 'react';
import axios from './axios';
    
export const productContext = createContext();

const Context = (props) => {
   const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
   );


   useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
        setproducts(JSON.parse(storedProducts));
    }
   }, []);


  // You can uncomment this block if you need to fetch products from an API
   const getproducts = async () => {
     try{
       const {data} = await axios("/products");
       setproducts(data);
     }
     catch (error){
        console.log(error);
     }
   };

   useEffect(()=>{
      getproducts();
   },[]);

  return ( 
        <productContext.Provider value={[products, setproducts]}>
             {props.children}
        </productContext.Provider>
  );
};

export default Context;
