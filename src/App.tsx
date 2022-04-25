import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TheTable from './components/Table';
import JsonData from './components/JsonData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<TheTable/>}/>
        <Route path={"/details"} element={<JsonData/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
