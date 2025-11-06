import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="card-body">
        <h3>{course.title}</h3>
        <p className="muted">{course.short}</p>
        <Link className="btn-link" to={`/courses/${course.id}`}>View Details</Link>
      </div>
    </div>
  )
}
