import React, { use, useState } from 'react'
import img1 from "../../assets/poert1.png"
import img2 from "../../assets/port2.png"
import img3 from "../../assets/port3.png"
import { div } from 'framer-motion/client'

export default function Portfolio() {
  let images =[img1 , img2 ,img3 , img1 , img2 ,img3]
  let [selectImg, setSelectImg] = useState(null);
  return (
    <>
    <section  className=' flex flex-col items-center justify-center w-full  '>
    <div  className=''>
    <h1 className=' font-bold text-4xl text-[#2C3E50] uppercase'>portfolio component</h1>
<div className='flex flex-row w-fit m-auto p-4'>
      <div className='w-17  me-2 mt-1 h-[3px] bg-[#2C3E50]'></div> 
       <i className="fa-solid fa-star  text-[#2C3E50] text-xs "></i>
      <div className='w-17 m-2 mt-1 h-[3px] bg-[#2C3E50]'></div> 

</div>  
  </div>
  <div className='my-5 mx-12 grid md:grid-cols-2 lg:grid-cols-3 gap-12'>
{ images.map((img , index)=>

   <div  key={index} onClick={()=>setSelectImg(img)} className=' rounded group relative '>

 <img className=' rounded-2xl' src={img} alt={img}/>
<div className=' hidden group-hover:flex  absolute inset-0 bg-[#1ABA9F]/95 text-8xl text-[150px] text-white  justify-center items-center rounded-2xl'><i className="fa-solid fa-plus text-[100px]"></i></div>

</div> )}

  </div>
 {selectImg &&  <div onClick={()=>setSelectImg(null)} className=' fixed  flex items-center justify-center inset-0   bg-[#1ABA9F]/25 '> <img  src={selectImg} alt="" className='w-1/2' onClick={(e)=>e.stopPropagation()} /></div>}
    </section>
    </>
  )
}
