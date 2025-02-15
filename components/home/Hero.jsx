import React from 'react'
import Container from '../common/Container'
import Image from 'next/image'
import hero from '@/public/images/codesupplyhero.webp'
import Link from 'next/link'


export default function Hero() {
  return (
    <Container className='relative py-4 px-0 pt-24'>
      {/* Hero Image */}
      <div className='relative h-[80vh] sm:h-[550px] sm:rounded-[4px] overflow-hidden'>
        <Image 
          src={hero} 
          alt="hero" 
          className='object-cover'
          fill
          priority
          sizes="(max-width: 1280px) 100vw"
        />
        
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-black/25' />

        {/* Content */}
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
          
          <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl'>
            Discover Stories, Ideas, and Expertise
          </h1>
          <p className='text-white/90 text-base md:text-lg max-w-xl mb-6'>
            Explore the latest insights on technology, lifestyle, and creative inspiration.
          </p>
          
        </div>
      </div>

      
    </Container>
  )
}

