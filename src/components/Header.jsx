import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { isClerkEnabled } from '../clerkConfig'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-left">
          <Link to="/" className="logo">
            Skill<span>Spring</span>
          </Link>
        </div>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Our Courses</Link>

          {isClerkEnabled ? (
            <>
              <SignedOut>
                <SignInButton>
                  <button className="btn-login">Login</button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            // Fallback: simple internal login route when Clerk is not configured
            <Link to="/login" className="btn-login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
