import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './App/store.js';
import Dashboard from './Components/Dashboard.jsx';
import SubCat from './Components/SubCat.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />} >
            <Route index element={<Dashboard />} />
            <Route path='subcat' element={<SubCat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
