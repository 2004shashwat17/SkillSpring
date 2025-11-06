import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SignInButton } from '@clerk/clerk-react'
import { isClerkEnabled } from '../clerkConfig'
import { motion } from 'framer-motion'
import ChatBot from '../components/ChatBot'
import skillVideo from '../skill.mp4'

const partners = [
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Goldman Sachs', domain: 'goldmansachs.com' },
  { name: 'PayPal', domain: 'paypal.com' },
  { name: 'Samsung', domain: 'samsung.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'Dell', domain: 'dell.com' },
  { name: 'JPMorgan', domain: 'jpmorganchase.com' },
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'EY', domain: 'ey.com' },
]

function Typing({ text, speed = 40 }) {
  const [value, setValue] = useState('')
  useEffect(() => {
    let idx = 0
    setValue('')
    const t = setInterval(() => {
      setValue(s => s + text[idx])
      idx++
      if (idx >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return (
    <span style={{ color: '#fff' }}>
      {value}
      <span style={{ color: '#00d1ff', animation: 'blink 1s infinite' }}>|</span>
    </span>
  )
}

export default function Home() {
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    // Continuous looping counters: animate up to target, pause, reset, repeat
    const counters = Array.from(el.querySelectorAll('.counter'))
    let running = true
    const activeTimers = new Set()

    function animateCounterToTarget(cn, target) {
      return new Promise(resolve => {
        let current = 0
        const duration = 1400
        const stepTime = 25
        const increments = Math.max(1, Math.floor(target / (duration / stepTime)))
        const timer = setInterval(() => {
          current += increments
          if (current >= target) {
            cn.textContent = target.toLocaleString()
            clearInterval(timer)
            activeTimers.delete(timer)
            resolve()
          } else {
            cn.textContent = current.toLocaleString()
          }
        }, stepTime)
        activeTimers.add(timer)
      })
    }

    async function loopCounters() {
      while (running) {
        // animate all counters to their targets in parallel
        await Promise.all(
          counters.map(cn => {
            const target = parseInt(cn.getAttribute('data-target'), 10) || 0
            return animateCounterToTarget(cn, target)
          })
        )
        // hold the final numbers briefly
        await new Promise(r => setTimeout(r, 900))
        // reset to zero quickly before next loop
        counters.forEach(cn => (cn.textContent = '0'))
        await new Promise(r => setTimeout(r, 400))
      }
    }

    // start looping immediately
    loopCounters()

    return () => {
      running = false
      activeTimers.forEach(t => clearInterval(t))
      activeTimers.clear()
    }
  }, [])

  return (
    <>
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2,
          }}
        >
          <source src={skillVideo} type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(10,10,40,0.85))',
            zIndex: -1,
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            textAlign: 'center',
            zIndex: 2,
            maxWidth: '700px',
            padding: '2rem',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SkillSpring
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
            Where learning grows into careers.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, minHeight: '60px' }}>
            <Typing text="Browse industry-focused courses. Learn by building projects and get support from our mentors." />
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              to="/courses"
              style={{
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: '0.3s',
              }}
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,162,255,0.6)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              Explore Courses
            </Link>
            {isClerkEnabled ? (
              <SignInButton>
                <button
                  style={{
                    border: '2px solid #fff',
                    color: '#fff',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: '0.3s',
                    background: 'transparent',
                  }}
                >
                  Login
                </button>
              </SignInButton>
            ) : (
              <Link
                to="/login"
                style={{
                  border: '2px solid #fff',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: '0.3s',
                  background: 'transparent',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        ref={statsRef}
        style={{
          background: '#0f172a',
          color: '#fff',
          textAlign: 'center',
          padding: '4rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '3rem',
          }}
        >
          {[
            { label: 'HAPPY LEARNERS', target: 1000 },
            { label: 'COURSES COMPLETED', target: 120 },
            { label: 'CAREERS BOOSTED', target: 500 },
          ].map((stat, i) => (
            <div key={i}>
              <div
                className="counter"
                data-target={stat.target}
                style={{ fontSize: '2.5rem', fontWeight: 800 }}
              >
                0
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ textAlign: 'center', padding: '4rem 0', background: '#fff' }}>
        <h3 style={{ fontWeight: 700, color: '#222', marginBottom: '2rem' }}>
          Our Learners Are Hired At
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            justifyItems: 'center',
            padding: '0 2rem',
          }}
        >
          {partners.map((p, i) => (
            <img
              key={i}
              src={`https://logo.clearbit.com/${p.domain}`}
              alt={p.name}
              title={p.name}
              style={{
                width: '90px',
              }}
            />
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section
        style={{
          margin: '4rem auto',
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '900px',
        }}
      >
        <h3 style={{ fontWeight: 700, color: '#111', marginBottom: '1.5rem' }}>
          On a Mission to Teach Millions
        </h3>

        {/* Simple auto-advancing carousel with ~5 images */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
          <Carousel
            images={[
              'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80',
              'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
            ]}
            interval={3000}
          />
        </div>
      </section>

      <ChatBot />
    </>
  )
}   

// Simple Carousel component placed at the bottom so it has access to React import
function Carousel({ images = [], interval = 3500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const len = images ? images.length : 0
  const containerRef = useRef(null)

  useEffect(() => {
    if (!images || images.length === 0) return
    if (paused) return
    const t = setInterval(() => setIndex(i => (i + 1) % len), interval)
    return () => clearInterval(t)
  }, [images, interval, paused, len])

  const prev = () => setIndex(i => (i - 1 + len) % len)
  const next = () => setIndex(i => (i + 1) % len)

  useEffect(() => {
    // keyboard navigation when carousel is focused
    const el = containerRef.current
    if (!el) return
    function onKey(e) {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [len])

  return (
    <div
      ref={containerRef}
      className="carousel"
      tabIndex={0}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button type="button" className="carousel-arrow left" onClick={prev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="carousel-arrow right" onClick={next} aria-label="Next slide">
        ›
      </button>

      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide ${i + 1}`}
          className={`carousel-slide ${i === index ? 'active' : ''}`}
          loading="lazy"
        />
      ))}

      <div className="carousel-dots" role="tablist" aria-label="Slides">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`carousel-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
