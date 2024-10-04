import React from 'react';
import UserPage from '~/pages/User/UserCard';

const User = () => {
  const UserData = [
    {
      firstname: 'Khoa',
      lastname: 'Phan',
      email: 'khoaphan@gmail.com',
      number: '1235',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@gmail.com',
      number: '5678',
    }
  ];
  console.log('UserData:', UserData);  // Log UserData array
  console.log('UserData[0]:', UserData[0]);  // Log first user data

  return (
    <UserPage UserData={UserData[0]} />  // Ensure UserData[0] is passed
  );
};

export default User;