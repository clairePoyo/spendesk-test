import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import UsersList from './UsersList'
import './TeamsContainer.css'

const TeamBlock = ({ name, id, users }) => {
  const allUsers = useSelector((store) => store.users)
  const allThresholds = useSelector((store) => store.thresholds)
  const dispatch = useDispatch()

  const getTeamApprovers = useCallback(() => {
    if (!allThresholds) {
      return
    }
    const teamApproversIndex = allThresholds.findIndex((item) => item.teamId === id)

    if (teamApproversIndex !== -1) {
      const teamApproversId = allThresholds[teamApproversIndex].thresholds.map((threshold) => threshold.approverId)
      if (teamApproversId && allUsers) {
        return UsersList(teamApproversId, allUsers, `team-${id}-approvers`)
      }
    }
  }, [allUsers, allThresholds, id])

  const openApprovalFlowModal = ({ name, id, users }) => {
    dispatch(actions.setSelectedTeam({ name, id, users }))
    dispatch(actions.setShowModal(true))
  }

  return (
    <div className="Team-container" data-testid="team-container" key={id}>
      <div className="Team-header">
        <h2>{name}</h2>
        <button
          onClick={() => openApprovalFlowModal({ name, id, users })}
          className="Team-edit-button"
          data-testid="team-edit"
        >
          Edit
        </button>
      </div>
      <div className="Team-usersBlock">
        <div>
          <p className="Team-userList-name">Team members</p>
          {users && allUsers && UsersList(users, allUsers, `team-${id}-users`)}
        </div>
        <div>
          <p className="Team-userList-name">Approvers</p>
          {allThresholds && getTeamApprovers()}
        </div>
      </div>
    </div>
  )
}

export default TeamBlock
