import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'   //coz we are exporting them all from index
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {

  const authStatus = useSelector((state) => state.auth.Status)  //This "auth" is name we gave &  status we are getting from initialState of authslice.js in store
  
  const navigate = useNavigate();

  //Basically set up the things we want in Header and we gonna use the above authStatus to ask them whether its active or not & use navigate to go through URLs
  const navItems = [
    {
      name: 'Home',
      slug: "/",      //url
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />     {/* Pass our Logo */}
              </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) =>       // We map the navItems array
            item.active ? (               //if the item is active then we display a list
              <li key={item.name}>        {/* Whenever a html element (in this case list) is repeating we put a key */}
                <button
                onClick={() => navigate(item.slug)}     //onclick on the name of the item we use navigate to go to that particular item's URL
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {item.name}     {/* Display item name in the header*/}
                </button>
              </li>
            ) : null                      //if not active then show nothing
            )}

            {authStatus && (      //This says that if authStatus is true only then show the logout btn
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
        </Container>
    </header>
  )
}

export default Header