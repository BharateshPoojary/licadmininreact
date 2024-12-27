import Mainwrapper from './Mainwrapper.jsx'
import Header from './UIparts/Header.jsx'
import Sidebar from './UIparts/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
function App() {
  return (
    <>
      <Mainwrapper>
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <Outlet />
        </div>
      </Mainwrapper>
    </>
  )
}

export default App
