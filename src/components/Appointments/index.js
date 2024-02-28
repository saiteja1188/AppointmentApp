// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputValue: '',
    inputDate: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onChangeInputValue = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputValue, inputDate} = this.state
    const formatted = inputDate
      ? format(new Date(inputDate), 'dd MM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: inputValue,
      date: formatted,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputValue: '',
      inputDate: '',
    }))
  }

  getFilterAppointments = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      appointmentList.filter(eachAppoint => eachAppoint.isStarred === true)
    }
    return appointmentList
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilterStar = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  render() {
    const {inputValue, inputDate, isFilterActive} = this.state
    const filterAppointmentList = this.getFilterAppointments()
    const filterClassName = isFilterActive ? 'filter-filed' : 'filter-empty'
    return (
      <div className="app-container">
        <div className="app-appointment">
          <div className="from-container">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="appointment-heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="input"
                onChange={this.onChangeInputValue}
                value={inputValue}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                placeholder="dd/mm/yyyy"
                className="input"
                onChange={this.onChangeInputDate}
                value={inputDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="hr-line" />
          <div className="filter-appointments-container">
            <h1 className="filter-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-button ${filterClassName}`}
              onClick={this.onFilterStar}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filterAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
