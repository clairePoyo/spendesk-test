import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, getAllByTestId, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TeamsContainer from './TeamsContainer'
import { initialStore } from '../reducers'

const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore({
    ...initialStore,
    teams: [
      { id: 'TEAM1', name: 'Marketing', users: ['USR1', 'USR3'] },
      { id: 'TEAM2', name: 'Product & Engineering', users: ['USR2', 'USR3', 'USR7', 'USR8', 'USR9'] },
    ],
    thresholds: [
      {
        teamId: 'TEAM2',
        thresholds: [
          {
            approverId: 'USR2',
            id: 1,
          },
          {
            approverId: 'USR3',
            id: 2,
          },
          {
            approverId: 'USR7',
            id: 3,
          },
          {
            approverId: 'USR9',
            id: 4,
          },
        ],
      },
      {
        teamId: 'TEAM1',
        thresholds: [
          {
            approverId: 'USR3',
            id: 1,
          },
        ],
      },
    ],

    users: [
      {
        id: 'USR1',
        first_name: 'USR1_firstName',
        last_name: 'USR1_lastName',
        email: 'USR1_email',
      },
      {
        id: 'USR2',
        first_name: 'USR2_firstName',
        last_name: 'USR2_lastName',
        email: 'USR2_email',
      },
      {
        id: 'USR3',
        first_name: 'USR3_firstName',
        last_name: 'USR3_lastName',
        email: 'USR3_email',
      },
      {
        id: 'USR3',
        first_name: 'USR3_firstName',
        last_name: 'USR3_lastName',
        email: 'USR3_email',
      },
      {
        id: 'USR7',
        first_name: 'USR7_firstName',
        last_name: 'USR7_lastName',
        email: 'USR7_email',
      },
      {
        id: 'USR8',
        first_name: 'USR8_firstName',
        last_name: 'USR8_lastName',
        email: 'USR8_email',
      },
      {
        id: 'USR9',
        first_name: 'USR9_firstName',
        last_name: 'USR9_lastName',
        email: 'USR9_email',
      },
    ],
  })
})

test('should display a block for each team', () => {
  const { getByText, getAllByTestId } = render(
    <Provider store={store}>
      <TeamsContainer />
    </Provider>,
  )

  expect(getAllByTestId('team-container').length).toBe(2)
  expect(getByText('Marketing')).toBeInTheDocument()
  expect(getByText('Product & Engineering')).toBeInTheDocument()
})

test('should list a max of 3 team members for a given team', () => {
  const { container } = render(
    <Provider store={store}>
      <TeamsContainer />
    </Provider>,
  )

  const team1UsersContainer = container.querySelector('[data-testid="team-TEAM1-users"]')
  expect(getAllByTestId(team1UsersContainer, 'team-user').length).toBe(2)
  const team2UsersContainer = container.querySelector('[data-testid="team-TEAM2-users"]')
  expect(getAllByTestId(team2UsersContainer, 'team-user').length).toBe(3)
})

test('should list a max of 3 approvers for a given team', () => {
  const { container } = render(
    <Provider store={store}>
      <TeamsContainer />
    </Provider>,
  )

  const team1ApproversContainer = container.querySelector('[data-testid="team-TEAM1-approvers"]')
  expect(getAllByTestId(team1ApproversContainer, 'team-user').length).toBe(1)
  const team2ApproversContainer = container.querySelector('[data-testid="team-TEAM2-approvers"]')
  expect(getAllByTestId(team2ApproversContainer, 'team-user').length).toBe(3)
})

test('should dispatch an action on "edit" click', async () => {
  const { container } = render(
    <Provider store={store}>
      <TeamsContainer />
    </Provider>,
  )

  fireEvent.click(container.querySelector('.Team-edit-button'))
  const actions = store.getActions()

  expect(actions.some((action) => action.type === 'SET_SELECTED_TEAM' && action.payload.id === 'TEAM1')).toBeTruthy()
  expect(actions.some((action) => action.type === 'SET_SHOW_MODAL' && action.payload === true)).toBeTruthy()
})
