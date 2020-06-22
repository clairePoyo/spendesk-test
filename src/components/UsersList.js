import React from 'react'

import './TeamsContainer.css'

const UsersList = (teamUsers, allUsers, testId) => {
  return (
    <ul className="Team-usersList" data-testid={testId}>
      {teamUsers.map((teamUser, index) => {
        if (index > 2) {
          return null
        }
        const userData = allUsers.filter((user) => user.id === teamUser)[0]

        return (
          <li key={userData.id} data-testid="team-user">
            {userData.first_name} {userData.last_name}
          </li>
        )
      })}
    </ul>
  )
}

export default UsersList
