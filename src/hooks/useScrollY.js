import { useEffect, useState } from 'react'

export function useScrollY() {
   const [position, setPosition] = useState(0)

   const handler = () => {
       setPosition(window.pageYOffset)
   }

   useEffect(() => {
       window.addEventListener('scroll', handler)
       return ()=> window.removeEventListener('scroll', handler)
   }, [])

 return position
}


export default useScrollY;