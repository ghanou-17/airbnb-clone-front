import React, { useContext, useEffect, useState } from 'react'
import { Star, HeartOutline, Map } from "heroicons-react";
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import GlobalContext from '../../context/GlobalContext';


export default function PlaceCard({place}) {

    const { wishlist, setWishlist } = useContext(GlobalContext)

    const [favorites, setFavorites] = useState([]);


    
   

     
   

  return (
    <div  className='p-3' onClick={() => Router.push(`/places/${place._id}`)}>   
                <div className='rounded-xl' style={{height: '400px'}}>
                    <div>
                        {/* Allow all domain image in Next.config.js */}
                        {/* <Image src={place.image} alt={place.title} width={40} height={40} /> */}
                        <div className='relative'>
                            <img className='object-cover h-72 block w-full border rounded-xl' src={place.images} alt={place.title} />
                           
                        </div>
                        <div className='flex justify-between mt-2 ml-2'>
                            <span className='font-semibold capitalize'>{place.title}, {place.Addresse && place.Addresse.city} </span>
                            {/* Model PLace Ajouter Note */}
                            <span className='flex'> <Star className='h-4 w-4 mt-1'/> 4.6</span>
                        </div>
                        <div className='ml-2 overflow-clip text-ellipsis capitalize-first' style={{color: '#717171'}}>{place.description} </div>
                        {/* Model Place Ajouter Plage date */}
                        <div className='ml-2 overflow-clip text-ellipsis' style={{color: '#717171'}}> 11 -17 aout </div>
                        <div className='mt-2 ml-2'> <span className='font-bold'>{place.pricing.perDay} €</span>  /nuit </div>
                    </div>

                </div>
            </div>
  )
}
