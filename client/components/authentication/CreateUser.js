import React, { Component } from 'react';
import UserInfo from './UserInfo';

function CreateUser() {
  return (
    <>
      <h1>Create Account</h1>
      <UserInfo type="create" />
    </>
  );
}

export default CreateUser;
