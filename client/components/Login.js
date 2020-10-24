import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }
    async onLoginSubmit(ev){
        ev.preventDefault()
        await axios.post(this.state)
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
              <form onSubmit={onLoginSubmit}>
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
                <button>Login</button>
              </form>
            </>
          );
        }
}


export default Login