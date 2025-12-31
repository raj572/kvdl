import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  useGSAP(()=>{

    // ABOUT TITLE ANIMATION
    const splitText = new SplitText(".about-text", { type: "chars" });
    gsap.from(splitText.chars, {
      yPercent: 100,
      opacity:0,
      duration: 2,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top center",
      },
    });

    // BORDER ANIMATION
    gsap.from(".under-border",{
      width: 0,
      duration:2,
      ease:"power3.out",
      scrollTrigger:{
        trigger: ".about-section",
        start: "top center",
      }
    });

    // CURTAIN REVEAL FOR ABOUT PARAGRAPH
    gsap.fromTo(".about-para",
      {
        clipPath: "inset(0 0 100% 0)",   
        opacity: 0.2
      },
      {
        clipPath: "inset(0 0 0% 0)",     
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top center",
        },
      }
    );

  });

  return (
    <div className='about-section min-h-dvh h-fit md:h-screen '>
      <div className='flex flex-col md:flex-row h-full'>
          <div className='w-full md:w-[50%] h-full p-5 gap-6 md:px-5 md:py-10 lg:py-15 lg:px-10 flex flex-col justify-between'>

            {/* Text Content */}
              <div className='heading flex flex-col gap-10'>
                <h1 className="about-text text-4xl md:text-6xl lg:text-8xl uppercase font-bold font-[arkhip] leading-none">
                  About
                </h1>
                <div className='under-border h-[1.5px] w-full bg-foreground-light rounded-xl'></div>

                <p className='about-para font-noto text-base lg:text-xl'>
                  Kedar Vanjape Developers Pvt. Ltd. is a group of dynamic young professionals with energy and drive to take on new challenges while exploring new horizons. <br />
                  Committed to excellence and our philosophy of T2E (Trust, Transparency and Ethics), we strive to reflect the highest standards in all the aspects of our operations and professional conduct.
                </p>

              </div>
              <div className='flex justify-between items-center uppercase font-[Sansation] text-sm lg:text-lg'>
                <p>Since 2014</p>
                <Link to="/about" className='border-b-2 border-dotted cursor-pointer hover:text-primary transition-all duration-300'>Read More</Link>
              </div>
          </div>

          <div className='w-full md:w-[50%] h-full relative '>
            <div className='absolute w-[60%] md:w-[80%] lg:w-[50%] py-4 px-2 md:py-6 md:px-4 gap-6 lg:gap-10 z-10 bottom-[10%] left-[50%] translate-x-[-50%] bg-white flex flex-col items-center justify-center '>
                <div className='bg-primary text-white font-[arkhip] px-3 py-1 hidden md:flex'>
                  <p className=''>KV</p>
                </div>
                <p className='font-[ephesis] text-gray-700 text-3xl lg:text-4xl -rotate-12'>Kedar Vanjape</p>
                <div className=' justify-between items-center w-full uppercase font-[Sansation] hidden md:flex'>
                  <p>CEO, Founder</p>
                  <p >Kedar Vanjape</p>
                </div>
              </div>
              <img src="/images/KVboss.png" alt="" className='h-full w-full object-cover '/>
          </div>

      </div>
    </div>
  )
}

export default About
