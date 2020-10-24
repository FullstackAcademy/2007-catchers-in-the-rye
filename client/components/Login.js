import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            message: ''
        }
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }
    async onLoginSubmit(ev){
        ev.preventDefault()
        const response = (await axios.post('/api/login',this.state)).data
        console.log(response)
        // this.setState({message: response})
    }
    setUsername(ev){
      console.log(ev.target.value)
      this.setState({username: ev.target.value})
    }
    setPassword(ev){
        console.log(ev.target.value)
        this.setState({password: ev.target.value})
    }
    render(){
        return (
            <>
              <h1>Login</h1>
              <form onSubmit={this.onLoginSubmit}>
                <label>
                  Username
                  <input
                    onChange={this.setUsername}
                  />
                </label>
                <label>
                  Password
                  <input
                    onChange={this.setPassword}
                    type="password"
                  />
                </label>
                <button type='submit'>Login</button>
                <p>{this.state.message}</p>
              </form>
            </>
          );
        }
}


export default Login