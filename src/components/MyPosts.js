import React ,{useState, useEffect}from 'react';
import Axios from 'axios';
import CardGrid from './CardGrid';
import './MyPosts.css'

export function MyPosts({email}){

  const [myposts, setMyposts] = useState([])

  useEffect(() => {
    console.log(" if email came "+email)
    if(email !== null){
      const queryParams = `?email=${email}`;
      try {
        Axios.get(`http://localhost:3001/getAllPostForThisUser${queryParams}`)
        .then((res)=>{
          console.log('result retrieved succesfully');
          const searchResult = res.data;
          if (searchResult) {
            console.log(searchResult);
            setMyposts(searchResult);
          }
        });
        
      } catch (error) {
        console.error(error);
      }
    }
  },[]); /// weird third bracked killed


    return (
        <div>
          {
            email === null ? (
              <h2 className="login first">login first</h2>  
            ) : (
              <div>
                <h2 className="myAllPosts">My Posts</h2>
                <CardGrid data = {myposts}/>
              </div>

            )
          }
          
        </div>
        );
}