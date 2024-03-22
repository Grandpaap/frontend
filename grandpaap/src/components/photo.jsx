import React, { useState } from 'react';
import { useCreatePhotoMutation, useDeletePhotoMutation, useGetPhotosQuery, useGetPhotoQuery } from "../api/grandpaapApi";

const Photo = () => {
  const { data, isLoading, isError, error, refetch } = useGetPhotosQuery();
  const [createPhoto] = useCreatePhotoMutation();
  const [deletePhoto] = useDeletePhotoMutation();

  const [title, setTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const authTokenFromStorage = localStorage.getItem('authToken');
  const isLoggedIn = !!authTokenFromStorage;

  const handleAddPhoto = async () => {
    if (!isLoggedIn) {
      console.error('User is not logged in');
      return;
    }

    try {
      await createPhoto({
        title,
        photoURL,
      });

      await refetch();
      setTitle('');
      setPhotoURL('');
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.photo}</div>;
  }

  return (
    <div>
      <h1>Photos</h1>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Photo URL</label>
        <input type='text' value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
      </div>
      <button onClick={handleAddPhoto}>Add Photo</button>

      {data.map(photo => (
        <div key={photo.id}>
          <p>Title: {photo.title}</p>
          <img src={photo.photoURL} alt={photo.title} /> 
        </div>
      ))}
    </div>
  );
}

export default Photo;
