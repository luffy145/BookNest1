import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './home';
import About from './component/About';
import Contact from './component/Contact';
import Shop from './component/Shop';
function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path='/About' element={<About/>} />
              <Route exact path='/Contact' element={<Contact/>} />
              <Route exact path='/Shop' element={<Shop />}/>
            </Routes>
        </BrowserRouter> 
    </div>
  );
}

export default App;
