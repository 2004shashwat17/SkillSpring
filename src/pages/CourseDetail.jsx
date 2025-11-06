import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import courses from '../data/courses'

export default function CourseDetail() {
  const { id } = useParams()
  const course = courses.find(c => c.id === id)
  const [billing, setBilling] = useState('hour')

  if (!course) {
    return (
      <div className="container">
        <h2>Course not found</h2>
        <p><Link to="/courses">Back to courses</Link></p>
      </div>
    )
  }

  const price = course.prices[billing]

  return (
    <section className="container course-detail">
      <div className="detail-left">
        <h2>{course.title}</h2>
        <p className="muted">{course.short}</p>
        <p>{course.long}</p>
        <div className="pricing">
          <label>
            <input type="radio" name="billing" value="hour" checked={billing==='hour'} onChange={() => setBilling('hour')} /> Hourly
          </label>
          <label>
            <input type="radio" name="billing" value="day" checked={billing==='day'} onChange={() => setBilling('day')} /> Daily
          </label>
          <label>
            <input type="radio" name="billing" value="month" checked={billing==='month'} onChange={() => setBilling('month')} /> Monthly
          </label>
          <div className="price">Price: ₹{price}</div>
        </div>
      </div>

      <aside className="detail-right">
        <img src={course.image} alt={course.title} className="demo-image" />
        <div className="contact">Contact: {course.contact}</div>
        <button className="btn primary" onClick={() => alert('Proceed to payment (demo)')}>Pay Now</button>
      </aside>
    </section>
  )
}
