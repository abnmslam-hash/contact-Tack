import {Button} from "@heroui/react";

import React from "react";

export default function Contact() {
  return (
    <>
      <section  className=' flex flex-col items-center justify-center w-full  '>
         <div  className=''>
         <h1 className=' font-bold text-4xl text-[#2C3E50] uppercase'>conatct section</h1>
     <div className='flex flex-row w-fit m-auto p-4'>
           <div className='w-17  me-2 mt-1 h-[3px] bg-[#2C3E50]'></div> 
            <i className="fa-solid fa-star  text-[#2C3E50] text-xs "></i>
           <div className='w-17 m-2 mt-1 h-[3px] bg-[#2C3E50]'></div> 
     
     </div>  
       </div>
       <div className="flex flex-col mt-10">
             <input className="w-150 border-b-1 border-b-gray-300 my-5 rounded-b-sm p-3" placeholder="userName" type="text" />
             <input className="w-150 border-b-1 border-b-gray-300 my-5 rounded-b-sm p-3" placeholder="userAge" type="number" />
             <input className="w-150 border-b-1 border-b-gray-300 my-5 rounded-b-sm p-3" placeholder="userEmail" type="email" />
             <input className="w-150 border-b-1 border-b-gray-300 my-5 rounded-b-sm p-3" placeholder="userPassword" type="password" />
             <button className="bg-[#1ABC9C] w-1/4 rounded-lg text-white py-2">send Message</button>;
       </div>
       </section>
    </>
  );
}
