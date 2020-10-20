import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import {HashRouter as Router} from 'react-router-dom'

//if using react router
ReactDOM.render(<Router><App /></Router>, document.getElementById("root"))

//if not using react router
// ReactDOM.render(<App />, document.getElementById("root"))
//make sure "root" is right or change it
