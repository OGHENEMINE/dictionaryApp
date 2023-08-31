import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'

function MobileNav({toggle, handleToggle}) {

  return (
    <nav className={classNames("md:hidden transition-all duration-500 ease-in-out flex flex-col gap-20 uppercase tracking-widest font-vollkorn font-bold text-2xl items-center px-6 pt-52 z-30 top-0 bottom-0 left-0 right-0 z-100 bg-white", {
        '-top-[100vh] hidden': toggle === false,
        'fixed': toggle == true
      })}>
        {["home", "wordsearch", "bookmark"].map((item) => (
              <NavLink
              key={item}
              to={item !== 'home'? `/${item}` : '/'}
              onClick={handleToggle}
              className={({ isActive }) =>
                isActive
                  ? "text-purple-800 h-8 block border-b border-purple-900"
                  : " block h-8 hover:text-purple-800"
              }
            >
              {item}
            </NavLink>
            )
            )}
        </nav>
  )
}

export default MobileNav