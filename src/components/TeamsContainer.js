import React from 'react'

import TeamBlock from './TeamBlock'
import { useSelector } from 'react-redux'

import './TeamsContainer.css'

const TeamsContainer = () => {
  const teams = useSelector((store) => store.teams)

  return (
    <div className="TeamsContainer-wrapper">
      {teams && teams.map(({ name, id, users }) => <TeamBlock key={id} id={id} name={name} users={users} />)}
    </div>
  )
}

export default TeamsContainer
