import React from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../common/SectionHeader'

const Preview = () => {
  return (
    <div className='min-h-dvh bg-foreground text-background pb-10 '>

      <div className='mx-auto max-w-[1400px]'>
        {/* HEADING */}
       <SectionHeader
        title="See in 360°"
        linkText="View in Full Screen"
        linkTo="/panaroma"
        description="Experience the space, not just the pictures, view every room in stunning 360° detail before you decide."
        className='text-white'
        />


      {/* 360 view */}
      <div className='aspect-video max-h-[90vh] w-full px-5'>
          <div className='h-full bg-neutral-700 rounded-xl border border-gray-500'>

          </div>
      </div>
      </div>
    </div>
  )
}

export default Preview