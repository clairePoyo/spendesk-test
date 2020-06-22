const setTeams = (teams) => {
  return {
    type: 'SET_TEAMS',
    payload: teams,
  }
}

const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    payload: users,
  }
}

const setThresholds = (thresholds) => {
  return {
    type: 'SET_THRESHOLDS',
    payload: thresholds,
  }
}

const setSelectedTeam = (team) => {
  return {
    type: 'SET_SELECTED_TEAM',
    payload: team,
  }
}

const setShowModal = (state) => {
  return {
    type: 'SET_SHOW_MODAL',
    payload: state,
  }
}

const actions = {
  setThresholds,
  setSelectedTeam,
  setShowModal,
  setTeams,
  setUsers,
}

export default actions
