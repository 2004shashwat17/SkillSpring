import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
// Login page removed; Clerk handles authentication UI
// Keep import removed: Login page intentionally not used when using Clerk
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          {/* Login route removed - Clerk SignInButton/SignUpButton handle auth UI */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
