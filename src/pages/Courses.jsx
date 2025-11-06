import React from 'react'
import courses from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Courses() {
  return (
    <section className="courses container">
      <h2>Our Courses</h2>
      <div className="grid grid-3">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  )
}
