import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Redux 
import { useDispatch } from 'react-redux';
import { login } from './redux/features/userSlice';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CreateStudySet from './pages/CreateStudySet';
import EditStudySet from './pages/EditStudySet';
import UserStudySets from './pages/UserStudySets';
import StudyFlashcards from './pages/StudyFlashcards';
import NotFoundPage from './pages/404';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    dispatch(login(token))
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/create' element={<CreateStudySet />} />
        <Route path='/my-studysets' element={<UserStudySets />} />
        <Route path='/edit/:id' element={<EditStudySet />} />
        <Route path='/study/:id' element={<StudyFlashcards />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
