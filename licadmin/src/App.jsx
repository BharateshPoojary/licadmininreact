

import Mainwrapper from './Mainwrapper'
import Header from './App/Header'
import Sidebar from './App/Sidebar'
import Dashboard from './App/Dashboard'

function App() {

  return (
    <>
      <Mainwrapper>
        <Sidebar />
        <div className="body-wrapper ">
          <Header />
          <Dashboard />
        </div>
      </Mainwrapper>
    </>
  )
}

export default App
