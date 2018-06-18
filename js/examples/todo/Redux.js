// @flow

import { createStore } from 'redux'

export type Action = AddTask | RemoveTask | MarkTask

export type AddTask = {
  type: 'ADD_TASK',
  id: ?string,
  title: string
}

export function addTask(title: string, id: ?string = null): AddTask {
  return {
    type: 'ADD_TASK',
    id,
    title
  }
}

export type RemoveTask = {
  type: 'REMOVE_TASK',
  id: string
}

export function removeTask(id: string): RemoveTask {
  return {
    type: 'REMOVE_TASK',
    id
  }
}

export type MarkTask = {
  type: 'MARK_TASK',
  id: string
}

export function markTask(id: string): MarkTask {
  return {
    type: 'MARK_TASK',
    id
  }
}

export type Task = {
  id: string,
  title: string,
  done: boolean
}

export type State = {
  nextId: number,
  tasks: Array<Task>
}

const initialState: State = {
  nextId: 0,
  tasks: []
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_TASK': {
      var nextId = state.nextId
      var taskId = action.id
      if (taskId == null) {
        taskId = nextId.toString()
        nextId += 1
      }
      return {
        ...state,
        nextId,
        tasks: [...state.tasks, { title: action.title, id: taskId, done: false }]
      }
    }
    case 'MARK_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (action.id != task.id) return task
          return { ...task, done: !task.done }
        })
      }
    }
    case 'REMOVE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => {
          return action.id != task.id
        })
      }
    }
    default:
      return state
  }
}

export const store = createStore(reducer)
