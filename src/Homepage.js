import './App.css';
import React ,{useState, useEffect}from 'react';
import './Homepage.css'
import Axios from 'axios';
import CardGrid from './components/CardGrid';

export function HomePage(){
    const [tolets, setTolets] = useState([]);
    const [formData,setFormData] = useState({
      country:"",
      city:"",
      minRent:"",
      maxRent:"",
      area:""
    })
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted Values:', formData);
      const { country, city, minRent, maxRent, area } = formData;
      const queryParams = `?country=${country}&city=${city}&minRent=${minRent}&maxRent=${maxRent}&area=${area}`;
      try {
        Axios.get(`http://localhost:3001/searchHouseRent${queryParams}`)
        .then((res)=>{
          console.log('search result retrieved succesfully');
          const searchResult = res.data;
          if (searchResult) {
            console.log(searchResult);
            setTolets(searchResult);
          }
        });
        
      } catch (error) {
        console.error(error);
      }

    };

    useEffect(() => {
      Axios.get('http://localhost:3001/getAllToLets').then((res) => {
        const data = res.data;
        if (data) {
          setTolets(data);
        }
      });
    }, []); // Empty dependency array ensures it runs only once on mount
  

    return (
        <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <h1 className='homepageHeading'>Search a house to rent</h1>
          <h3 className='homepageHeading'> We'll do the searching for you</h3>
          <div className="search-container">
          
          <form className="searchBar" onSubmit={handleSubmit}>
            <input className="searchFields" type="text" placeholder="Country.." name="country" value={formData.country} onChange={handleInputChange} />
            <input className="searchFields" type="text" placeholder="City.." name="city" value={formData.city} onChange={handleInputChange} />
            <input className="searchFields" type="text" placeholder="Minimum Rent.." name="minRent" value={formData.minRent} onChange={handleInputChange} />
            <input className="searchFields" type="text" placeholder="Maximum Rent.." name="maxRent" value={formData.maxRent} onChange={handleInputChange} />
            <input className="searchFields" type="text" placeholder="Area.." name="area" value={formData.area} onChange={handleInputChange} />
            <button className="searchButton" type="submit"><i className="fa fa-search"></i></button>
        </form>
         </div>
        <div>
          <h2 className="allToletsText">All To-Lets:</h2>
          <CardGrid data = {tolets}/>
        </div>
        </div>
        );
}