import React from 'react'
const Feedback = () => {
  return (
    <div className="container mt-5">
      <form action="https://getform.io/f/a12cbfc6-78c4-442e-b434-a9980cee8c4f" method="POST">
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Namn
          </label>
          <input className="form-control" type="text" name="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            E-post
          </label>
          <input className="form-control" type="email" name="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Meddelande
          </label>
          <textarea className="form-control" name="message" required />
        </div>
        <input type="hidden" name="_gotcha" style={{display:"none !important"}}></input>
        <button className="btn btn-warning" type="submit">
        Skicka
        </button>
      </form>
    </div>
  )
}
export default Feedback