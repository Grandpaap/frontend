import React, { useState } from 'react';
import { useCreateGroupmessageMutation, useDeleteGroupmessageMutation, useGetGroupmessagesQuery } from "../api/grandpaapApi";

const Test = () => {
  const { data, isLoading, isError, error, refetch } = useGetGroupmessagesQuery();
  const [createGroupMessage] = useCreateGroupmessageMutation();
  const [deleteGroupMessage] = useDeleteGroupmessageMutation();
  
  const [groupId, setGroupId] = useState('');
  const [content, setContent] = useState('');
  
  const authTokenFromStorage = localStorage.getItem('authToken');
  const isLoggedIn = !!authTokenFromStorage;

  const handleSendGroupMessage = async () => {
    if (!isLoggedIn) {
      console.error('User is not logged in');
      return;
    }

    try {
      await createGroupMessage({
        groupId,
        content,
      });
      
    
      await refetch();
      
     
      
      setContent('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Messages</h1>
      <div>
        <label>Group ID:</label>
        <input type="text" value={groupId} onChange={(e) => setGroupId(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button onClick={handleSendGroupMessage}>Send Message</button>
      
     
      {data.map(message => (
        <div key={message.id}>
          <p>From: {message.senderName}</p> 
          <p>Content: {message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Test;