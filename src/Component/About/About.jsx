import React from 'react'

export default function About() {
  return (
    <>
    <section className=' flex flex-col items-center justify-center w-full h-screen bg-[#1ABC9C]'>
    <div >
    <h1 className=' font-bold text-4xl text-white'>ABOUT COMPONENT</h1>
<div className='flex flex-row w-fit m-auto p-4'>
      <div className='w-17  me-2 mt-1 h-[3px] bg-white'></div> 
       <i className="fa-solid fa-star text-white text-xs "></i>
      <div className='w-17 m-2 mt-1 h-[3px] bg-white'></div> 

</div>  
  </div>
   <div className='flex flex-row w-2/3'>
     <p className='text-white'>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
     <p className='text-white'>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
   </div>
    </section>
    </>
  )
}

