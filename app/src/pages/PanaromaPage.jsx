import React, { useEffect } from 'react'
import TextScroll from '../components/common/TextScroll';

const PanaromaPage = () => {
       useEffect(() => {
   window.scrollTo(0, 0);
 }, []);
   return (
     <div className="panaroma-page min-h-dvh">
 
       {/* STICKY TOP SECTION */}
       <div className="sticky top-0 z-10 w-full ">
         <TextScroll 
           text="Panaroma - 360 - Visualization "
           repeat={6}
           duration={180}
           className='pt-24 text-5xl md:pt-40 md:text-7xl  lg:text-9xl '
         />
       </div>
 
       {/* CONTENT BELOW */}
       <div className="panaroma-hero min-h-dvh bg-background relative z-20">
         
       </div>
 
     </div>
     
   )
}

export default PanaromaPage