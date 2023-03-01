import React, {useState, useEffect, useContext } from 'react'
import PlaceCard from './PlaceCard'
import PlaceService from '../../public/services/places.service'
import GlobalContext from '../../context/GlobalContext';

export default function Places() {

    const {search, category, filterPrice, filterCapacity} = useContext(GlobalContext)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [list, setList] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
      let filteredPlaces = places;
      
      if (category !== '') filteredPlaces = filteredPlaces.filter(place => place.types === category);
      if (search !== '') filteredPlaces = filteredPlaces.filter(place => place.title.toLowerCase().includes(search.toLowerCase()) || place.description.toLowerCase().includes(search.toLowerCase()));
      
      if (parseInt(filterPrice.min) !== 0) filteredPlaces = filteredPlaces.filter(place => parseInt(place.pricing.perDay) >= parseInt(filterPrice.min))
      if (parseInt(filterPrice.max) !== 9999) filteredPlaces = filteredPlaces.filter(place => parseInt(place.pricing.perDay) <= parseInt(filterPrice.max));
        
      if (parseInt(filterCapacity.min) !== 0) filteredPlaces = filteredPlaces.filter(place => place.capacity >= parseInt(filterCapacity.min))
      if (parseInt(filterCapacity.max) !== 100) filteredPlaces = filteredPlaces.filter(place => place.capacity <= parseInt(filterCapacity.max));
          
      setList(filteredPlaces);
    }, [search, category, filterPrice, filterCapacity]);
      

  async function fetchData() {
    try {
      const response = await PlaceService.getPlaces();
      setPlaces(response.data);
      setList(response.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className='text-2xl font-bold text-center mt-52'>Loading...</p>;
    // return <Loader/>
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='my-4 mx-auto' style={{width: '94%'}}>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-44 justify-around cursor-pointer'>
            {category !== '' || search !== '' || parseInt(filterPrice.min) !== 0 || parseInt(filterPrice.max) !== 9999 || parseInt(filterCapacity.min) !== 0 || parseInt(filterCapacity.max) !== 100 ? list.map((place) => 
              <div key={place._id}>
              <PlaceCard place={place}/>
            </div>) : places.map((place) => 
            <div key={place._id}>
              <PlaceCard place={place}/>
            </div>)}
        </div>
    </div>
    
  )
}
