import { useState, useEffect } from 'react';
import { useGetGroupsQuery, useCreateGroupmembershipMutation, useCreateGroupMutation } from "../api/grandpaapApi";
import { List, ListItem, ListItemText, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '20px',
});

const StyledGroupsContainer = styled('div')({
  width: '40%',
  marginRight: '20px',
});

const StyledFormContainer = styled('div')({
  width: '40%',
});

const StyledHeader = styled('h2')({
  margin: '0 auto',
});

const StyledSuccessMessage = styled('p')({
  marginBottom: '20px',
  color: 'green',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
});

const GroupSignup = () => {
  const { data: groups, isLoading, isError, error, refetch } = useGetGroupsQuery();
  const [createGroupMembership] = useCreateGroupmembershipMutation();
  const [createGroup] = useCreateGroupMutation();
  const [successMessage, setSuccessMessage] = useState('');
  const [groupName, setGroupName] = useState('');
  const authTokenFromStorage = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authTokenFromStorage);
  const userId = decodedToken.id;

  useEffect(() => {
    refetch();
  }, []);

  const handleGroupSignup = async (groupId) => {
    try {
      await createGroupMembership({
        userId: userId,
        groupId: groupId,
      });
      setSuccessMessage('Group joined successfully');
    } catch (error) {
      console.error('Error signing up for group:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const response = await createGroup({
        name: groupName
      });

      console.log('Group created:', response);
      setSuccessMessage('Group created successfully');
      setGroupName(''); // Clear the input field after creating the group
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleReturnHome = () => {
    console.log("Returning home...");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <StyledContainer>
      <StyledGroupsContainer>
        <StyledHeader>Available Groups</StyledHeader>
        {successMessage && (
          <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
        )}
        <List>
          {groups.map((group) => (
            <ListItem key={group.id} button onClick={() => handleGroupSignup(group.id)}>
              <ListItemText primary={group.name} />
            </ListItem>
          ))}
        </List>
      </StyledGroupsContainer>
      <StyledFormContainer>
        <StyledHeader>Create New Group</StyledHeader>
        <form onSubmit={handleCreateGroup}>
          <TextField
            label="Group Name"
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create New Group
          </Button>
        </form>
        <StyledButton component={Link} to="/" variant="contained" color="primary" onClick={handleReturnHome} fullWidth>
          Return Home
        </StyledButton>
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default GroupSignup;
