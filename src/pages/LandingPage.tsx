import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { carouselData } from '../artifacts/carouseldata'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useApp } from '../context/AppContext'
import LoginPage from './loginPage'

export function LandingPage() {
  const { user } = useApp() as any
  return (
    
          <Carousel infiniteLoop autoPlay className="w-[80vw]">
            {carouselData.map((item, idx) => (
              <div
                className="bg-cover bg-center h-[80vh] w-[80vw] flex flex-row items-end p-10"
                style={{ backgroundImage: `url(${item.image})` }}
                key={idx}
              >
                <div className=" opacity-80 bg-gray-600 w-full rounded-md">
                  <p className=" text-white text-left">{item.text}</p>
                </div>
              </div>
            ))}
          </Carousel>)
        
   
}
