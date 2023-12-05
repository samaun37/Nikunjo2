import './App.css';
import React ,{useState, useEffect}from 'react';
import { Form, Input, Select, Button } from 'antd';
import MyImage from './samaun.jpg';

import Axios from 'axios';

export function HomePage(){
    const [query, setQuery]=useState('');
    const [weather,setWeather]=useState('');
    const [tolets, setTolets] = useState([]);
    const [testImage,setTestImage] = useState();
    const paragraph = './samaun.jpg'
    const search = async(e)=>{
        
    }
    
    
    useEffect(() => {
      Axios.get('http://localhost:3001/getAllToLets').then((res) => {
        const data = res.data;
        if (data) {
        //  console.log(data.images)
          setTolets(data);
        }
      });
    });

    return (
        <div>
            <p style={{ color: 'green' }}>Search a house to rent</p>
        <div style={{ display: 'flex' }}>
          <input 
            type="text"
            placeholder="Search Country ..."
            className="search"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyPress={search}
          />
          <input 
            type="text"
            placeholder="Search City ..."
            className="search"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        <div>
          <h2>All To-Lets:</h2>
          <div>
          {tolets.map((tolet, index) => (
            <div key={index}>
              <h3>Rent: {tolet.rent}</h3>
              <p>Country: {tolet.country}</p>
              <p>City: {tolet.city}</p>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {tolet.imageUrls.map((url, imageIndex) => (
                  <div>
                  <img
                    key={imageIndex}
                    src = {url}
                    alt={`Image ${imageIndex}`}
                    width="450"
                    height="300" //200
                  />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
        );
}
