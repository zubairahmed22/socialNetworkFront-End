import "./login.css"
import "../components/nav.css"
import Nav from "../components/Nav"
import { UserProvider } from "../Context"
import "./index.css"
import './register.css'
import './dasboard.css'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css"

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
        <Nav/>
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
        </UserProvider>
    )
  }

  export default MyApp