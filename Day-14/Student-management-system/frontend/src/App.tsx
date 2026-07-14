
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditStudents from './pages/EditStudents';
import AddStudents from './pages/AddStudents';
import Students from './pages/Students';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/students" element={<Students/>}/>
      <Route path = "/edit-student/:id" element = {<EditStudents/>}/>
      <Route path = "/add-student" element = {<AddStudents/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

