import './App.css';
import React ,{useState, useEffect}from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import storage from './firebase'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";


export function AddToLet(){
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [tolet, setTolet] = useState({
      country: '',
      city: '',
      location: '',
      room: '',
      washroom: '',
      rent: '',
      imageUrls: [],
    });
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
      console.log(images.length);
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
            <p style={{ color: 'green' }}>Add a To-Let</p>
           <div >

            <Form.Item
              name='country'
              label='Country'
              rules={[
                {
                  required: true,
                  message: 'Enter country ',
                },
              ]}>
              <Input
                type='text'
                name='country'
                value={tolet.country}
                onChange={handleChange}
                placeholder='Country'
              />
            </Form.Item>

            <Form.Item
              name='city'
              label='city'
              rules={[
                {
                  required: true,
                  message: 'Enter city ',
                },
              ]}>
              <Input
                type='text'
                name='city'
                value={tolet.city}
                onChange={handleChange}
                placeholder='City'
              />
            </Form.Item>

            <Form.Item
              name='location'
              label='location'
              rules={[
                {
                  required: true,
                  message: 'Enter location ',
                },
              ]}>
              <Input
                type='text'
                name='location'
                value={tolet.location}
                onChange={handleChange}
                placeholder='Location'
              />
            </Form.Item>

            <Form.Item
              name='room'
              label='room'
              rules={[
                {
                  required: true,
                  message: 'Enter room ',
                },
              ]}>
              <Input
                type='text'
                name='room'
                value={tolet.room}
                onChange={handleChange}
                placeholder='Room'
              />
            </Form.Item>

            <Form.Item
              name='washroom'
              label='washroom'
              rules={[
                {
                  required: true,
                  message: 'Enter washroom ',
                },
              ]}>
              <Input
                type='text'
                name='washroom'
                value={tolet.washroom}
                onChange={handleChange}
                placeholder='Washroom'
              />
            </Form.Item>

            <Form.Item
              name='rent'
              label='rent'
              rules={[
                {
                  required: true,
                  message: 'Enter rent ',
                },
              ]}>
              <Input
                type='text'
                name='rent'
                value={tolet.rent}
                onChange={handleChange}
                placeholder='Rent'
              />
            </Form.Item>
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
           <Button htmlType='submit' onClick={done}>
							Done
						</Button>
        </div>
        );
}

// const setImageUrls = async()=>{
    //   images.forEach((image, index) => {
    //     const imageRef = ref(storage, `images/${image.name + v4()}`);
    //     uploadBytes(imageRef, image).then((snapshot) => {
    //       getDownloadURL(snapshot.ref).then((url) => {
    //         setNewUrls((prevUrls) => [...prevUrls, url]);
    //         console.log(url);
    //       });
    //     });
    //   })
    // }
    // const setImageUrls = async () => {
    //   const uploadTasks = images.map((image) => {
    //     return new Promise((resolve, reject) => {
    //       const imageRef = ref(storage, `images/${image.name + v4()}`);
    //       uploadBytes(imageRef, image)
    //         .then((snapshot) => {
    //           getDownloadURL(snapshot.ref)
    //             .then((url) => {
    //               resolve(url);
    //               console.log(url);
    //             })
    //             .catch((error) => reject(error));
    //         })
    //         .catch((error) => reject(error));
    //     });
    //   });
  
    //   try {
    //     const uploadedUrls = await Promise.all(uploadTasks);
    //     setTolet(prevTolet => ({
    //       ...prevTolet,
    //       imageUrls: [...prevTolet.imageUrls, ...uploadedUrls],
    //     }));
    //   } catch (error) {
    //     console.error("Error uploading images:", error);
    //   }
    // };
