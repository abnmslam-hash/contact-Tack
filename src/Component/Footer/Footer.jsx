import React from 'react'

export default function Footer() {
  return (
    <>
     <div  className='flex bg-[#2C3E50]'>
      <div className='w-1/3  p-20 '>
     <div className=' w-fit m-auto text-center text-white '>
       <h3 className='text-2xl font-bold '>LOCATION</h3>
      <p className='p-3'>2215 John Daniel Drive</p>
      <p>Clark, MO 65243</p>
     </div>
      </div>

     <div className=' w-fit m-auto text-center text-white '>
              <h3 className='text-2xl font-bold '>AROUND THE WEB</h3>
              <ul className='flex gap-2 w-fit m-auto pt-1'>
                <li className=' border w-8 h-8 rounded-full'><i className="fa-brands fa-facebook text-xs"></i></li>
                <li className=' border w-8 h-8 rounded-full'><i className="fa-brands fa-twitter text-xs"></i></li>
                <li className=' border w-8 h-8 rounded-full'><i className="fa-brands fa-linkedin-in text-xs"></i></li>
                <li className=' border w-8 h-8 rounded-full'><i className="fa-solid fa-globe text-xs"></i></li>
              </ul>

      </div>
     <div className=' w-fit m-auto text-center text-white '>
       <h3 className='text-2xl font-bold '>ABOUT FREELANCER</h3>
        <p>Freelance is a free to use, licensed Bootstrap theme created by Route</p>
      </div>
      
     </div>
     <div className='bg-[#1A252F] p-5'><p className='text-center text-white text-xs'>Copyright © Your Website 2021</p></div>
    </>
  )
}
