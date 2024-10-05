import {Routes, Route} from 'react-router-dom'
import Home from './../pages/Home';
import Errorpage from './../pages/Errorpage';
import ComplexNavbar from './components/Navbar';
const App = () => {
  return (
    <Routes>
      <Route path='/' errorElement={<Errorpage />}  index element={<Home />} />
      <Route path='/*' element={<Errorpage/> } errorElement={<Errorpage />} />
    </Routes>
  )
}

export default App