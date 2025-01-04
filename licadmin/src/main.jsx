import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './App/store.js';
import Dashboard from './UIparts/Dashboard.jsx';
import SubCat from './UIparts/SubCat.jsx';
// import Template from './UIparts/Template.jsx';
import ManufacturingFundPdf from './UIparts/ManufacturingFundPdf.jsx';
import Register from './UIparts/Register.jsx';
import Adminlogin from './UIparts/Adminlogin.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} >
            <Route index element={<Register />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='subcat' element={<SubCat />} />
          </Route>
          <Route path='adminlogin' element={<Adminlogin />} />
          {/* <Route path='template' element={<Template />} /> */}
          <Route path='manufacturingpdf' element={<ManufacturingFundPdf />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
