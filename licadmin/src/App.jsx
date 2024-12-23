import Mainwrapper from './Mainwrapper.jsx'
import Header from './App/Header.jsx'
import Sidebar from './App/Sidebar.jsx'
import Dashboard from './App/Dashboard.jsx'

function App() {
  return (
    <>
      <Mainwrapper>
        <Sidebar />
        <div className="body-wrapper">
          <Header />
          <Dashboard />
        </div>
      </Mainwrapper>
    </>
  )
}

export default App
