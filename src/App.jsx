import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpinnerLoader } from './components/LoadingStates';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));

function App() {
  return (
    <>
      <div className="bg-mesh" />
      <Navbar />
      <Suspense fallback={<div className="page-loader"><SpinnerLoader text="Loading..." /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
