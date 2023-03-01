import React, { useRef, useState } from 'react';
import placesService from '../../public/services/places.service';
import { useRouter } from 'next/router';
import WithAuth from '../../pages/WithAuth'

const addPlace = () => {

    const router = useRouter();
    const [message, setMessage] = useState('')
    

  const [place, setPlace] = useState({
    title: '',
    types: '',
    owner: '',
    pricePerDay: '',
    capacity: '',
    description: '',
    images: '',
    address: {
        city: '',
        street:{
            zipCode: '',
            gps:{
                lat: '',
                long: ''
            }
        }
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let { token } = JSON.parse(localStorage.getItem('Auth'))
    placesService.addPlace({
      title: place.title,
      types: place.types,
      pricing: {
        perDay: place.pricePerDay
      },
      images: place.images,
      capacity: place.capacity,
      description: place.description,
      address: {
        city: place.city,
        street: "",
        zipCode: place.address.street.zipCode,
        gps: {
          lat: place.address.street.gps.lat,
          long: place.address.street.gps.long,
        }
      }
    }, token)
    .then((res) => {
      if (res && res.code != 'ERR_BAD_RESPONSE') {
        console.log(res)
       router.push('/')
      }
        else{
          setMessage(res.response.data.message)
        }
    })
    .catch((errors) => {
        setMessage(errors)
    })
  };
 

  return (
    <form onSubmit={handleSubmit} className='mx-auto mt-24 p-3 mb-8 border-slate-500 border rounded-md'>
      <div className="mb-4 text-center ">
        <label className="block text-secondary font-bold text-xl mb-2" htmlFor="title">
          Titre
        </label>
        <input 
          className={`border w-full border-gray-400 p-2 rounded`}
          type="text"
          name="title"
          placeholder='Maison bord de Mer'
          id="title"
          onChange={(e) => setPlace({...place,title:e.target.value})}
          value={place.title}
        />
        {/* {errors && errors.title && (
          <p className="text-red-500 text-xs italic">
            Title is required and must be between 2 and 50 characters.
          </p>
        )} */}
      </div>

      <div className="mb-4 text-center">
        <label className="block text-secondary font-bold mb-2 text-left" htmlFor="type">
          Type
        </label>
        <input
          className={`border w-full border-gray-400 p-2 rounded`}
          type="text"
          name="types"
          id="types"
          min={0}
          max={9999}
          onChange={(e) => setPlace({...place,types:e.target.value})}
          value={place.types}
        />
      </div>
    
    <div className="mb-4 grid grid-cols-2 gap-2 justify-evenly">
        <div>
        <label className="block text-secondary italic font-semibold mb-2 w-full" htmlFor="pricePerDay">
          Prix / jour
        </label>
        <input
          className={`border w-full border-gray-400 p-2 rounded `}
          type="number"
          name="pricePerDay"
          id="pricePerDay"
          min={0}
          max={9999}
          onChange={(e) => setPlace({...place,pricePerDay:e.target.value})}
          value={place.pricePerDay}
        /> 
        </div>
        <div className='w-full'>
        <label className="block font-semibold w-full text-secondary italic mb-2" htmlFor="capcity">
          Nombre de personnes
        </label>
        <input
          className={`border w-full border-gray-400 p-2 rounded`}
          type="number"
          name="capacity"
          min={0}
          max={100}
          id="capacity"
          onChange={(e) => setPlace({...place,capacity:e.target.value})}
          value={place.capacity}
        />
        </div>
    </div>

        
    <div className="mb-4 w-full">
        <label className="block text-secondary w-full font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className={`border w-full border-gray-400 p-2 rounded `}
          name="description"
          placeholder='Maison en bord de mer, trés calme et ...'
          id="description"
          onChange={(e) => setPlace({...place,description:e.target.value})}
          value={place.description}
        />
    </div>
    <div className="mb-4">
        <label className="block text-secondary font-medium mb-2" htmlFor="image">
          Image
        </label>
        <input
          className={`border w-full border-gray-400 p-2 rounded `}
          type="text"
          placeholder='https://image/url.com'
          name="images"
          id="images"
          onChange={(e) => setPlace({...place,images:e.target.value})}
          value={place.images}
        />
    </div>
    <div className="mb-4 mt-4 flex justify-center text-center">
        <div className='mr-2'>
            <label className="block italic font-medium mb-2" htmlFor="city">
            City
            </label>
            <input
            className={`border w-full border-gray-400 p-2 rounded`}
            type="text"
            placeholder='Paris'
            name="address.city"
            id="city"
            onChange={(e) => setPlace({ ...place, address: { ...place.address, city: e.target.value } })}
            value={place.address.city}
            />
        </div>
        <div className='ml-2'>
            <label className="block italic font-medium mb-2" htmlFor="zipCode">
            Zip Code
            </label>
            <input
            className={`border w-full border-gray-400 p-2 rounded`}
            type="number"
            placeholder='75010'
            name="address.street.zipCode"
            id="zipCode"
            min={0}
            onChange={(e) => setPlace({ ...place, address: { ...place.address, street: {...place.address.street, zipCode: e.target.value } } })}
            value={place.address.street.zipCode}
            />
        </div>
    </div>
    
    <div className="mb-4 flex justify-center text-center">
        <div className='mr-1'>
            <label className="block font-medium mb-2" htmlFor="lat">
            Latitude
            </label>
            <input
            className={`border w-full border-gray-400 p-2 rounded`}
            type="text"
            placeholder='48.808311'
            name="address.street.gps.lat"
            id="lat"
            onChange={(e) => setPlace({ ...place, address: { ...place.address, street: {...place.address.street, gps: {...place.address.street.gps, lat: e.target.value}} } })}
            value={place.address.street.gps.lat}
            />
        </div>
        <div className='ml-1'>
            <label className="block  font-medium mb-2" htmlFor="long">
            Longitude
            </label>
            <input
            className={`border w-full border-gray-400 p-2 rounded`}
            type="text"
            placeholder='2.234734'
            name="address.street.gps.long"
            id="long"
            onChange={(e) => setPlace({ ...place, address: { ...place.address, street: {...place.address.street, gps: {...place.address.street.gps, long: e.target.value}} } })}

            value={place.address.street.gps.long}
            />
        </div>
    </div>
        
        <div className='w-40 mx-auto text-center'>
            <button type='submit' onClick={handleSubmit} className="bg-slate-500 hover:shadow-xl hover:scale-105 transition-all text-white font-medium py-2 px-4 rounded-full">
            Valider
            </button>
        </div>
        {message && 
          <div className='p-2 w-3/4 mt-4 bg-red-600 rounded-md mx-auto text-center relative' >
            {message} <span className='cursor-pointer absolute top-1 right-1 font-bold text-xl' onClick={() => setMessage('')}>X</span>
          </div> 
        }
    </form>
  )
}
export default WithAuth(addPlace);
    