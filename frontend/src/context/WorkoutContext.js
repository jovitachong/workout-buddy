import { createContext, useReducer } from 'react'

// Let’s say ur app is like a gym n ur workouts are exercises you can do at the gym.
// Context: The gym's whiteboard where all the exercises are listed.
// Reducer: The gym manager who knows the rules about how to add, update, or remove exercises from the whiteboard.
// Provider: The person who makes sure that everyone in the gym can see the whiteboard and knows who to talk to (the gym manager) if they want to change anything on it.

// Step 1: Create a context (the whiteboard)
export const WorkoutsContext = createContext()

// Step 2: Create the reducer (the gym manager with rules)
// SET_WORKOUTS   -> UPDATE
// CREATE_WORKOUT -> POST
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload // Replace the list
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts] // Add new workout to the start
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(w => w._id !== action.payload._id)
      }
    default:
      return state // If no known action, do nothing
  }
}

// Step 3: Create the Provider (make the whiteboard and gym manager available)
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}