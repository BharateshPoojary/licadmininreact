import Mainwrapper from './Mainwrapper.jsx'
import Header from './Components/Header.jsx'
import Sidebar from './Components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
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
