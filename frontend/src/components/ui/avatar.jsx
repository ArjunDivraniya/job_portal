import * as React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ImageAvatars() {
  const { user } = useSelector(store => store.auth);

  return (
    <Stack direction="row" spacing={2}>
      {user?.profilePicture ? (
        <Avatar alt={`${user?.firstName} ${user?.lastName}`} src={user.profilePicture} />
      ) : (
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      )}
    </Stack>
  );
}
