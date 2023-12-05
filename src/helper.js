    // const uploadImages = async () => {
      //   try {
      //     const newUrlsArray = await Promise.all(
      //       images.map(async (image) => {
      //         const imageRef = ref(storage, `images/${image.name + v4()}`);
      //         const snapshot = await uploadBytes(imageRef, image);
      //         const url = await getDownloadURL(snapshot.ref);
      //         console.log(url);
      //         return url;
      //       })
      //     );
  
      //     setTolet((prevTolet) => ({
      //       ...prevTolet,
      //       imageUrls: [...prevTolet.imageUrls, ...newUrlsArray],
      //     }));
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };