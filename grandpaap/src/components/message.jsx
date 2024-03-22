import React, { useState, useEffect } from 'react';
import { useCreateMessageMutation, useGetMessagesQuery, useGetUsersQuery, useGetGroupmembershipsQuery } from "../api/grandpaapApi";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledMessageContainer = styled('div')({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflowY: "auto",
  borderBottom: "1px solid #ccc",
});

const StyledMessageHeader = styled('h2')({
  margin: "0 auto",
});

const StyledTextFieldContainer = styled('div')({
  display: "flex",
  paddingLeft: "20px",
  width: "90%",
});

const StyledButtonContainer = styled('div')({
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
});

const Message = () => {
  const { data: messages, isLoading: isLoadingMessages, isError: isErrorMessages, error: messagesError, refetch: refetchMessages } = useGetMessagesQuery();
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: usersError, refetch: refetchUsers } = useGetUsersQuery();
  const [createMessage] = useCreateMessageMutation();
  const [recipientId, setRecipientId] = useState('');
  const [content, setContent] = useState('');
  const authTokenFromStorage = localStorage.getItem('authToken');
  const isLoggedIn = !!authTokenFromStorage;
  const navigate = useNavigate();
  const {
    data: groupMembership,
    isLoading: isLoadingGroupMemberships,
    isError: isErrorGroupMemberships,
    error: groupMembershipsError,
    refetch: refetchGroupMemberships,
  } = useGetGroupmembershipsQuery();

  useEffect(() => {
    refetchUsers();
    refetchGroupMemberships();
  }, []);

  if (!isLoggedIn) {
    navigate("/register");
    return null; 
  }

  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      console.error('User is not logged in');
      return;
    }

    try {
      await createMessage({
        recipientId,
        content,
      });
      
      await refetchMessages();
      setContent('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  const handleUserClick = (userId) => {
    setRecipientId(userId); 
  };

  if (isLoadingMessages || isLoadingUsers || isLoadingGroupMemberships) {
    return <div>Loading...</div>;
  }

  if (isErrorMessages || isErrorUsers || isErrorGroupMemberships) {
    return <div>Error: {messagesError?.message || usersError?.message || groupMembershipsError?.message}</div>;
  }

  // Get the logged-in user's group ID
  const decodedToken = jwtDecode(authTokenFromStorage);
  const userId = decodedToken.id;
  const loggedInUserMembership = groupMembership.find(membership => membership.userId === userId);
  const loggedInUserGroupId = loggedInUserMembership ? loggedInUserMembership.groupId : null;

  // Filter group users based on the group membership of the logged-in user
  const filteredGroupUsers = users.filter(user =>
    groupMembership.some(membership => membership.userId === user.id && membership.groupId === loggedInUserGroupId)
  );

  // Filter messages based on the sender and recipient IDs
  const filteredMessages = messages.filter(message =>
    (message.senderId === userId && message.recipientId === recipientId) ||
    (message.senderId === recipientId && message.recipientId === userId)
  );
  const messagesWithSenderNames = filteredMessages.map((message) => {
    const sender = users.find((user) => user.id === message.senderId);
    return {
      ...message,
      senderName: sender ? sender.name : "Unknown Sender",
    };
  });
  
  // Render a message if there are no family members
  if (filteredGroupUsers.length === 0) {
    return (
      <div>
        <p>Please join a family group to view messages.</p>
        <Button component={Link} to="/groupsignup" variant="contained" color="primary">
          Join a Group
        </Button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Family Members */}
      <div
        style={{
          width: "25%",
          paddingLeft: "20px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        <h2>Family Members</h2>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {filteredGroupUsers.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton onClick={() => handleUserClick(user.id)}> 
                <ListItemAvatar>
                  <Avatar alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Messages */}
      <div style={{ flex: 1 }}>
        <StyledMessageContainer>
          <StyledMessageHeader>Personal Messages</StyledMessageHeader>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {messagesWithSenderNames.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={message.senderName} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.content}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          From: {message.senderName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          
          <StyledTextFieldContainer>
            <label>Your Message:</label>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </StyledTextFieldContainer>

          <StyledButtonContainer>
            <Button
              onClick={handleSendMessage}
              variant="contained"
              color="primary"
            >
              Send Message
            </Button>
          </StyledButtonContainer>
        </StyledMessageContainer>
      </div>
    </div>
  );
}

export default Message;
