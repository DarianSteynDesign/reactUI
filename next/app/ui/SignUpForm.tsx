'use client'

import { useState } from 'react'
import { createUser } from '../lib/userActions'

export default function SignUpForm() {
  const [error, setError] = useState(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)

    try {
      await createUser(formData)
      window.location.href = '/login'
    } catch (error) {
      setError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" required />
      </div>
      <div>
        <label htmlFor="surname">Surname:</label>
        <input type="text" name="surname" id="surname" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}
