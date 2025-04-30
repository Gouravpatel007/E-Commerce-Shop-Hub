import React, { useContext } from 'react'
import { productContext } from '../utils/Context';
import { Link } from 'react-router-dom';

let Nav = () => {

  const [products] = useContext(productContext);

  let distinct_category = products && products.reduce((acc,cv)=>[...acc,cv.category],[]);
  distinct_category = [...new Set(distinct_category)];


  const color = () => {
    return `rgba(${(Math.random() *255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };



  return (
    <nav className='w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5'>
    <a className='py-2 px-5 border rounded border-blue-300 text-blue-300' href="/create">
    Add New Product
   </a>
    <hr className='my-3 w-[80%]'/>
    <h1 className='text-2xl font-regular w-[80%] mb-3'>Category Filter</h1>
    <div className='w-[80%]'>

      {distinct_category.map((c, i) => (
         <Link key={i} to={`/?category=${c}`} className="flex items-center mb-3">
            <span style={{backgroundColor: color() }} className='mr-2 rounded-full w-[15px] h-[15px]'></span>{" "}
            {c}
         </Link>
      ))}
    </div>
  </nav>
  );
};  

export default Nav;





{/* <li className="flex items-center mb-3">
           <span className='mr-2 rounded-full w-[15px] h-[15px] bg-red-100'></span>{" "}
           cat 1
       </li>
       <li className="flex items-center mb-3">
           <span className='mr-2 rounded-full w-[15px] h-[15px] bg-green-100'></span>{" "}
           cat 1
       </li> */}