export const initialStore = {
  showModal: false,
}

export const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.payload,
      }
    case 'SET_THRESHOLDS':
      return {
        ...state,
        thresholds: action.payload,
      }
    case 'SET_SELECTED_TEAM':
      return {
        ...state,
        selectedTeam: action.payload,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }
    case 'SET_SHOW_MODAL':
      return {
        ...state,
        showModal: action.payload,
      }
    default:
      return state
  }
}

export default {
  reducer,
  initialStore,
}
