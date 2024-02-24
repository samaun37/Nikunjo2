import './App.css';
import React ,{useState, useContext, useEffect}from 'react';
import { Form, Input, Select, Button } from 'antd';
import Axios from 'axios';
import storage from './firebase'
import './AddToLet.css'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { MyPosts } from './components/MyPosts';


export function AddToLet(){
  let loggedInUser = localStorage.getItem('user')
  if(loggedInUser){
    console.log("we see " + loggedInUser)
  }
  else {
    loggedInUser = null;
    console.log("samaun ultimate check no user logged in ")
  }
  console.log("samaun ultimate check " + loggedInUser)
    const { Option } = Select;
    const [form] = Form.useForm();
    const [selectedOption, setSelectedOption] = useState('rentHouse');
    const handleSelectChange = (value) => {
      setSelectedOption(value);
    };
    const [tolet, setTolet] = useState({
      country: '',
      city: '',
      location: '',
      room: '',
      washroom: '',
      rent: '',
      imageUrls: [],
    });
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setTolet({ ...tolet, [name]: value });
    };
    const [images, setImages] = useState([]);

    const setImageUrls = async () => {
      console.log(images.length);
      const urlPromises = images.map(async (image) => {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        return url;
      });
    
      const urls = await Promise.all(urlPromises);
      setTolet(prevTolet => ({
        ...prevTolet,
        imageUrls: urls 
      }));
    };


    const handleImageChange = (e) => {
      const files = e.target.files;
      const imageFiles = Array.from(files);
      setImages(imageFiles);
    };


    const handleChange = (e) => {
      const { name, value } = e.target;
      setTolet({
        ...tolet,
        [name]: value,
      });
      console.log(name, value);
    };
    const done = () => {    
      if(loggedInUser == null){
        alert('you have to be looged in');
        return;
      }  
      const uploadTasks = images.map((image) => {
          return new Promise((resolve, reject) => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);
            uploadBytes(imageRef, image)
              .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                  .then((url) => {
                    resolve(url);
                    console.log(url);
                  })
                  .catch((error) => reject(error));
              })
              .catch((error) => reject(error));
          });
        });

     Promise.all(uploadTasks).then((res) =>{
      console.log("res:", res);
      setTolet(prevTolet => ({
        ...prevTolet,
        imageUrls: res
      }));
      const toletId = crypto.randomUUID();
      const {
        country,
        city,
        location,
        room,
        washroom,
        rent,
        imageUrls
      } = tolet; 
    
      if (country && city && location && room && washroom && rent && res) {

        const requestData = {
          country,
          city,
          location,
          room,
          washroom,
          rent,
          id: toletId,
          email: loggedInUser,
          imageUrls: res, 
        };
        try {
          Axios.post('http://localhost:3001/addToLets', requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res)=>{
            console.log('To-Let added successfully');
          });
          
        } catch (error) {
          console.error(error);
        }
      } else {
        alert('Enter all fields');
      }


     })

     
    };
    return (
        <div>
            <Select
              defaultValue="addtolet"
              style={{ width: 200 }}
              onChange={handleSelectChange}
              className='selector'
              >
              <Option value="rentHouse">Add House Rent</Option>
              <Option value="myPosts">My Posts</Option>
            </Select>

            {selectedOption === 'rentHouse' ? (
              <div>
                <h3 className='addtoletText'> Add a Post</h3>
              <form className="formItems" >
                <input className="eachFormItems" type="text" placeholder="Country.." name="country" value={tolet.country} onChange={handleInputChange} />
                <input className="eachFormItems" type="text" placeholder="City.." name="city" value={tolet.city} onChange={handleInputChange} />
                <input className="eachFormItems" type="text" placeholder="Rent.." name="rent" value={tolet.rent} onChange={handleInputChange} />
                <input className="eachFormItems" type="text" placeholder="Location.." name="location" value={tolet.location} onChange={handleInputChange} />
                <input className="eachFormItems" type="text" placeholder="Room.." name="room" value={tolet.room} onChange={handleInputChange} />
                <input className="eachFormItems" type="text" placeholder="Washroom.." name="washroom" value={tolet.washroom} onChange={handleInputChange} />
            </form>
           <div className='imageInput'>
            <Form.Item
              name="images"
              label="Images"
              rules={[
                {
                  required: true,
                  message: "Upload at least one image",
                },
              ]}
            >
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Form.Item>
           </div>
           <Button className='doneButton' htmlType='submit' onClick={done}>
							POST
						</Button>
           </div>
            ) : selectedOption === 'myPosts' ? (


              /// here

              
              <MyPosts email = {loggedInUser}/>

            //  <h1 className='addtoletText'>hotel</h1>
            ) : null}            
      
        </div>
        );
}