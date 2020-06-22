import React from 'react'

const ApproverOption = ({ user, approverId, thresholdsList }) => {
  if (user.id === approverId || thresholdsList.findIndex((threshold) => user.id === threshold.approverId) !== -1) {
    return (
      <option value={user.id} disabled>
        {user.first_name} {user.last_name}
      </option>
    )
  }
  return (
    <option value={user.id}>
      {user.first_name} {user.last_name}
    </option>
  )
}

const ThresholdLine = ({ threshold, users, thresholdsList, updateThreshold, deleteThreshold }) => {
  return (
    <div className="Threshold-container">
      <span>From</span>
      <input
        className="Threshold-input"
        onChange={(e) => updateThreshold(e.target.value, 'floorValue', threshold.id)}
        value={threshold.floorValue}
        type="number"
      />
      <span>to</span>
      <input
        className="Threshold-input"
        onChange={(e) => updateThreshold(e.target.value, 'roofValue', threshold.id)}
        value={threshold.roofValue}
        type="number"
      />
      {users && (
        <select
          className="Threshold-select"
          onChange={(e) => updateThreshold(e.target.value, 'approverId', threshold.id)}
          value={threshold.approverId}
        >
          <option>select a approver</option>
          {users.map((user) => (
            <ApproverOption
              key={user.id}
              user={user}
              thresholdsList={thresholdsList}
              approverId={threshold.approverId}
            />
          ))}
        </select>
      )}

      <button className="Threshold-delete-button" onClick={(e) => deleteThreshold(threshold.id)}>
        Delete
      </button>
    </div>
  )
}

export default ThresholdLine
