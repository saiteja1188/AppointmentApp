// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starredUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }
  return (
    <li className="list-items">
      <div className="list-content">
        <p className="list-name">{title}</p>
        <button type="button" onClick={onClickStar} testid='star' className="button">
          <img
            src={starredUrl}
            alt="star"
            data-testid="star"
            className="star-img"
          />
        </button>
      </div>
      <p className="list-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
