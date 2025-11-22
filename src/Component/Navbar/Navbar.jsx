import React from 'react'
import About from '../About/About'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { NavLink } from 'react-router-dom';

export default function NavbarAoot() {

  return (
    <>
  
<Navbar className='  bg-[#2c3e50] py-3' position="static">


      <NavbarBrand className=' flex justify-between' >
       
        <p> <NavLink to="/" className=" navintro font-bold text-4xl text-white " >START FARMEWORK</NavLink> </p>
        <div className='md:hidden  '><i className="fa-solid fa-bars text-2xl"></i></div>
      </NavbarBrand>

      
      <NavbarContent className="" justify="center">
        <NavbarItem className=' hidden md:flex uppercase font-bold '>
          <NavLink className='text-white mx-1 rounded-sm px-2 py-2' to="about">about</NavLink>
          <NavLink className='text-white mx-1 rounded-sm px-2 py-2' to="portfolio">portfolio</NavLink>
          <NavLink className='text-white mx-1 rounded-sm px-2 py-2' to="contact">contact</NavLink>
        </NavbarItem>
      </NavbarContent>



    </Navbar>




    </>
  )
}
