import React, { Component } from 'react'
import axios from 'axios'
import UserInfo from './UserInfo'

export default function Login () {
  return(
    <>
      <h1>Login</h1>
      <UserInfo type='login'></UserInfo>
    </>
  )
}