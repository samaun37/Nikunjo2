import React ,{useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Carousal from './components/Carousal'
import './Tolet.css'
import { Button } from 'antd';


const Tolet = () => {
  let loggedInUser = localStorage.getItem('user')
  const [toletEmail, setToletEmail] = useState()
  const toletId = useParams().id;
  const [tolet, setTolet] = useState([]);
  const [imageUrls,setImageUrls] = useState([]);
  const deletePost = ()=>{
    // try {
    //   const response = Axios.delete(`http://localhost:3001/deleteTolet/${tolet.id}`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error deleting tolet:', error.response.data.message);
    //   throw error;
    // }
    try {
      const requestData = {
        id: tolet.id
      };
      Axios.post('http://localhost:3001/deleteTolet',requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res)=>{
        console.log('tolet deleted succesfully');
      });
      
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    console.log("samaun "+toletId)
    const queryParams = `?toletId=${toletId}`;
    Axios.get(`http://localhost:3001/getToLetById${queryParams}`).then((res) => {
      const data = res.data;
      if (data) {
        setTolet(data);
        setImageUrls(data.imageUrls);
        setToletEmail(data.email);
      }
    });
  }, [toletId]);
  return (
    <div>
    <div className='toletData'>
        <Carousal images = {imageUrls} />
        <div className='toletDetails'>
        <h2 className='address'>
          <b>City:</b> <span className='normal-black'>{tolet.city} ({tolet.country})</span>
         </h2>
          <h2 className='address'>
          <b>Address:</b> <span className='normal-black'>{tolet.location}</span>
         </h2>
         <h2 className='address'>
          <b>Room:</b> <span className='normal-black'>{tolet.room}</span>
         </h2>
         <h2 className='address'>
          <b>Washroom:</b> <span className='normal-black'>{tolet.washroom}</span>
         </h2>
         <h2 className='address'>
          <b>Rent:</b> <span className='normal-black'>{tolet.rent}</span>
         </h2>
         <h2 className='address'>
          <b>Contact:</b> <span className='normal-black'>{tolet.email}</span>
         </h2>
        </div>
    </div>
    {loggedInUser === toletEmail && (
      <Button className='deletePostButton' htmlType='submit' onClick={deletePost}>
        Delete Post
      </Button>
    )}
    </div>
  );
};
// 

export default Tolet;