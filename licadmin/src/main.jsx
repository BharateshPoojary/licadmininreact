import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './App/store.js';
import Dashboard from './Components/Dashboard.jsx';
import SubCat from './Components/SubCat.jsx';
import Template from './Components/Template.jsx';
import ManufacturingFundPdf from './Components/ManufacturingFundPdf.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} >
            <Route index element={<Dashboard />} />
            <Route path='subcat/:catid/:catname' element={<SubCat />} />
          </Route>
          <Route path='template/:tempid/:tempname' element={<Template />} />
          <Route path='manufacturingpdf/:id/:tempname' element={<ManufacturingFundPdf />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
