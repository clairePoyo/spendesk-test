import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from './actions'

import logo from './logo.svg'
import Mock from './mock'
import TeamsContainer from './components/TeamsContainer'
import ApproversModal from './components/ApproversModal'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const showModal = useSelector((store) => store.showModal)
  const closeModal = () => {
    dispatch(actions.setShowModal(false))
  }

  useEffect(() => {
    // problem with cors so we mock the api response
    fetch('https://s3-eu-west-1.amazonaws.com/spx-development/contents/teams', { mode: 'no-cors' }).then(() => {
      dispatch(actions.setTeams(Mock.teamsData))
    })
    fetch('https://s3-eu-west-1.amazonaws.com/spx-development/contents/users', { mode: 'no-cors' }).then(() => {
      dispatch(actions.setUsers(Mock.usersData))
    })
    dispatch(actions.setThresholds(JSON.parse(localStorage.getItem('thresholdsList'))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
      </header>
      <TeamsContainer />
      <ApproversModal modalIsOpen={showModal} closeModal={closeModal} />
    </div>
  )
}

export default App
