import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import './ApprovalFlowEditor.css'
import ThresholdLine from './ThresholdLine'

const ApprovalFlow = ({ closeModal }) => {
  const dispatch = useDispatch()
  const selectedTeam = useSelector((store) => store.selectedTeam)
  const allUsers = useSelector((store) => store.users)
  const allThresholds = useSelector((store) => store.thresholds)

  const [thresholds, setThresholds] = useState([])

  const getTeamThresholds = () => {
    if (allThresholds) {
      const teamThresholds = allThresholds.filter((team) => team.teamId === selectedTeam.id)[0]
      if (teamThresholds) {
        return teamThresholds.thresholds
      } else {
        return []
      }
    } else {
      return []
    }
  }

  useEffect(() => {
    setThresholds(getTeamThresholds())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allThresholds])

  const usersInformations = selectedTeam.users.map((teamUser) => allUsers.find((user) => teamUser === user.id))

  const saveAndCloseModal = () => {
    saveThresholds()
    closeModal()
  }

  const createThreshold = () => {
    const newThresholds = [...thresholds]
    newThresholds.push({
      id: Date.now(),
      floorValue: '',
      roofValue: '',
      approverId: '',
    })
    setThresholds([...newThresholds])
  }

  const updateThreshold = (newValue, field, thresholdId) => {
    const thresholdIndex = thresholds.findIndex((item) => item.id === thresholdId)
    const newThresholds = [...thresholds]
    newThresholds[thresholdIndex][field] = newValue
    setThresholds([...newThresholds])
  }

  const deleteThreshold = (thresholdId) => {
    const newThresholds = thresholds.filter((threshold) => threshold.id !== thresholdId)
    setThresholds([...newThresholds])
  }

  const getSavedThresholds = () => {
    const savedList = localStorage.getItem('thresholdsList')
    try {
      return JSON.parse(savedList)
    } catch (e) {
      return []
    }
  }

  const saveThresholds = () => {
    const savedList = getSavedThresholds()
    const cleanedUnsavedList = cleanUnsavedThresholdsList()

    if (savedList && savedList.length > 0) {
      const teamIndex = savedList.findIndex((item) => item.teamId === selectedTeam.id)

      if (teamIndex !== -1) {
        if (cleanedUnsavedList.length === 0) {
          savedList.splice(teamIndex, 1)
          localStorage.setItem('thresholdsList', JSON.stringify(savedList))
          dispatch(actions.setThresholds(savedList))
        } else {
          savedList[teamIndex].thresholds = cleanedUnsavedList
          localStorage.setItem('thresholdsList', JSON.stringify(savedList))
          dispatch(actions.setThresholds(savedList))
        }
      } else {
        if (cleanedUnsavedList.length === 0) {
          return
        }
        localStorage.setItem(
          'thresholdsList',
          JSON.stringify([...savedList, ...[{ teamId: selectedTeam.id, thresholds: cleanedUnsavedList }]]),
        )
        dispatch(
          actions.setThresholds([...savedList, ...[{ teamId: selectedTeam.id, thresholds: cleanedUnsavedList }]]),
        )
      }
    } else {
      if (cleanedUnsavedList.length === 0) {
        return
      }

      localStorage.setItem(
        'thresholdsList',
        JSON.stringify([{ teamId: selectedTeam.id, thresholds: cleanedUnsavedList }]),
      )
      dispatch(actions.setThresholds([{ teamId: selectedTeam.id, thresholds: cleanedUnsavedList }]))
    }
  }

  const cleanUnsavedThresholdsList = () => {
    const cleanedList = thresholds.filter((threshold) => threshold.floorValue !== '' && threshold.approverId !== '')
    setThresholds([...cleanedList])
    return cleanedList
  }

  const computeThresholdsList = () =>
    thresholds.map((threshold) => (
      <ThresholdLine
        key={threshold.id}
        threshold={threshold}
        thresholdsList={thresholds}
        users={usersInformations}
        updateThreshold={updateThreshold}
        deleteThreshold={deleteThreshold}
      />
    ))

  return (
    <div className="Approval-content">
      <div className="Approval-header">
        <h2 style={{ margin: '0' }}>Approval flow for {selectedTeam.name} team</h2>
        <button style={{ height: '30px' }} onClick={saveAndCloseModal}>
          save & close
        </button>
      </div>
      <div className="Approval-thresholds">{thresholds && computeThresholdsList()}</div>
      <button className="Approval-add-button" onClick={createThreshold}>
        Add a threshold
      </button>
    </div>
  )
}

export default ApprovalFlow
