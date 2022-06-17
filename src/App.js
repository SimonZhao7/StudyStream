import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Redux 
import { useDispatch } from 'react-redux';
import { login } from './redux/features/userSlice';
// Components
import Navbar from './components/Navbar';
// Pages
import Hero from './pages/Hero';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import CreateStudySet from './pages/CreateStudySet';
import EditStudySet from './pages/EditStudySet';
import UserStudySets from './pages/UserStudySets';
import StudyFlashcards from './pages/StudyFlashcards';
import SearchResults from './pages/SearchResults';
import NotFoundPage from './pages/404';
import APIConnect from './pages/APIConnect';
import APICallback from './pages/APICallback';
import UserSettings from './pages/UserSettings';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    dispatch(login(token))
  }, [dispatch])

  return (
    <Router>
      <Navbar transparent={window.location.pathname === '/'} />
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/create' element={<CreateStudySet />} />
        <Route path='/my-studysets' element={<UserStudySets />} />
        <Route path='/settings' element={<UserSettings />} />
        <Route path='/edit/:id' element={<EditStudySet />} />
        <Route path='/study/:id' element={<StudyFlashcards />} />
        <Route path='/results/*' element={<SearchResults />} />
        <Route path='/connect' element={<APIConnect />} />
        <Route path='/api/callback' element={<APICallback />} />
        <Route path='/' element={<Hero />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
