import React, { useState, useEffect } from "react";
import {
  useCreateGroupmessageMutation,
  useGetUsersQuery,
  // useDeleteGroupmessageMutation,
  useGetGroupmessagesQuery,
  useGetGroupmembershipsQuery,
  useGetPhotosQuery,
  useCreatePhotoMutation,
} from "../api/grandpaapApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { TextField } from "@mui/material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
const Group = () => {
  const {
    data: groupMessages,
    isLoading: isLoadingGroupMessages,
    isError: isErrorGroupMessages,
    error: groupMessagesError,
    refetch: refetchGroupMessages,
  } = useGetGroupmessagesQuery();
  const {
    data: groupMembership,
    isLoading: isLoadingGroupMemberships,
    isError: isErrorGroupMemberships,
    error: groupMembershipsError,
    refetch: refetchGroupMemberships,
  } = useGetGroupmembershipsQuery();
  const {
    data: photos,
    // isLoading: isLoadingPhotos,
    // isError: isErrorPhotos,
    // error: photosError,
    refetch: refetchPhotos,
  } = useGetPhotosQuery();
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [createGroupMessage] = useCreateGroupmessageMutation();
  // const [deleteGroupMessage] = useDeleteGroupmessageMutation();
  const [createPhoto] = useCreatePhotoMutation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const authTokenFromStorage = localStorage.getItem("authToken");
  const isLoggedIn = !!authTokenFromStorage;
  const navigate = useNavigate();

  useEffect(() => {
    refetchGroupMemberships();
    refetchUsers();
    refetchPhotos();
  }, []);

  if (!isLoggedIn) {
    navigate("/register");
    return null;
  }
  const decodedToken = jwtDecode(authTokenFromStorage);
  const userId = decodedToken.id;
  const userGroupMembership = groupMembership?.find(
    (membership) => membership.userId === userId
  );
  const userGroupId = userGroupMembership?.groupId;

  const handleSendGroupMessage = async () => {
    if (!isLoggedIn) {
      console.error("User is not logged in");
      return;
    }

    try {
      if (!userGroupId) {
        console.error("Group membership information is missing.");
        return;
      }

      await createGroupMessage({
        groupId: userGroupId,
        content,
      });

      await refetchGroupMessages();

      setContent("");
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  const handleAddPhoto = async () => {
    if (!isLoggedIn) {
      console.error("User is not logged in");
      return;
    }

    try {
      await createPhoto({
        title,
        photoURL,
        groupId: userGroupId,
      });

      await refetchPhotos();
      setTitle("");
      setPhotoURL("");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  if (isLoadingGroupMessages || isLoadingGroupMemberships || isLoadingUsers) {
    return <div>Loading...</div>;
  }

  if (isErrorGroupMessages || isErrorGroupMemberships || isErrorUsers) {
    return (
      <div>
        Error:{" "}
        {groupMessagesError?.message ||
          groupMembershipsError?.message ||
          usersError?.message}
      </div>
    );
  }

  // Filter users who are in the same group as the logged-in user
  const filteredUsers = users.filter((user) =>
    groupMembership.some(
      (membership) =>
        membership.userId === user.id && membership.groupId === userGroupId
    )
  );

  // Filter messages with sender names

  const groupMessagesForUserGroup = groupMessages.filter(
    (message) => message.groupId === userGroupId
  );
  const messagesWithSenderNames = groupMessagesForUserGroup.map((message) => {
    const sender = users.find((user) => user.id === message.senderId);
    return {
      ...message,
      senderName: sender ? sender.name : "Unknown Sender",
    };
  });

  const groupPhotos = photos.filter((photo) => photo.groupId === userGroupId);
  if (filteredUsers.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Please join a family group to view group messages and photos</h2>
        <Button
          component={Link}
          to="/groupsignup"
          variant="contained"
          color="primary"
        >
          Join a Group
        </Button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Group Members */}
      <div
        style={{
          width: "25%",
          paddingLeft: "20px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        <h2>Family Members</h2>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {filteredUsers.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton component={Link} to={`/message`}>
                <ListItemAvatar>
                  <Avatar alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Group Messages and Group Photos */}
      <div
        style={{
          width: "75%",
          display: "flex",
          paddingRight: "30px",
          flexDirection: "column",
          border: "1px solid #ccc",
        }}
      >
        {/* Group Messages */}
        <div
          style={{
            height: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            overflowY: "auto",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h2 style={{ margin: "0 auto" }}>Family Messages</h2>

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
          <div style={{ display: "flex", paddingLeft: "20px", width: "90%" }}>
            <label>Your Message:</label>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleSendGroupMessage}
              variant="contained"
              color="primary"
            >
              Send Message
            </Button>
          </div>
        </div>

        {/* Group Photos */}
        <div
          style={{
            height: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          <h2 style={{ margin: "0", padding: "0" }}>Family Photos</h2>

          <ImageList sx={{ width: 800, height: 500 }}>
            {groupPhotos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img
                  src={`${photo.photoURL}?w=248&fit=crop&auto=format`}
                  alt={photo.title}
                  loading="lazy"
                />
                <ImageListItemBar title={photo.title} position="below" />
              </ImageListItem>
            ))}
          </ImageList>
          <div>
            <TextField
              label="Photo Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
            />
          </div>
          <div>
            <TextField
              label="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              size="small"
            />
          </div>
          <Button
            onClick={handleAddPhoto}
            variant="contained"
            color="primary"
            size="small"
          >
            Add Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Group;
