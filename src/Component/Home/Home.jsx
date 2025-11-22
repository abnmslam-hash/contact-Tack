import React from 'react'
import useimg from "../../assets/avataaars.svg"


export default function Home() {
  return (
    <>
      <section className='flex align-items-center justify-center bg-[#1ABC9C] w-full h-screen' >
<div className='flex flex-col items-center justify-center' >
<img className='w-60 h-60 ' src={useimg} alt="" />
<div>
  <h2 className=' font-bold text-4xl text-white pt-7'>START FARMEWORK</h2>
<div className='flex flex-row w-fit m-auto p-4'>
      <div className='w-17  me-2 mt-1 h-1 bg-white'></div> 
       <i className="fa-solid fa-star text-white "></i>
      <div className='w-17 m-2 mt-1 h-1 bg-white'></div> 

</div>
      <p className='text-white text-xs w-fit m-auto'>Graphic Artist - Web Designer - Illustrator</p>


</div>

</div>
      </section>
    </>
  )
}
