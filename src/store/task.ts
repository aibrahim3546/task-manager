// Utilities
import { defineStore } from 'pinia'

export type TStatus = 'pending' | 'progress' | 'done'

export interface ITask {
  id: number
  title: string
  description: string
  label: string
  estimatedTime: string
  comments: [],
  files: string[];
}

interface TaskStoreState {
  uniqueId: number
  pendingTasks: ITask[],
  progressTasks: ITask[],
  doneTasks: ITask[],
}

export const useTaskStore = defineStore('task', {
  state: (): TaskStoreState => ({
    uniqueId: 0,
    pendingTasks: [],
    progressTasks: [],
    doneTasks: [],
  }) ,
  actions: {
    increaseUniqueId() {
      this.uniqueId = this.uniqueId + 1;
    },
    addTask(task: ITask, status: TStatus) {
      if (status === 'progress') {
        return this.progressTasks.push(task)
      }

      if (status === 'done') {
        return this.doneTasks.push(task)
      }

      return this.pendingTasks.push(task)
    },
    updateTasks(tasks: ITask[], status: TStatus) {
      // console.log('tasks => ', tasks);

      if (status === 'progress') {
        return this.progressTasks = [...tasks]
      }

      if (status === 'done') {
        return this.doneTasks = [...tasks]
      }

      return this.pendingTasks = [...tasks]
    },
    updateTask(index: number, task: ITask, status: TStatus) {
      if (status === 'progress') {
        return this.progressTasks[index] = {...task}
      }

      if (status === 'done') {
        return this.doneTasks[index] = {...task}
      }

      return this.pendingTasks[index] = {...task}
    },
    deleteTask(index: number, status: TStatus) {
      if (status === 'progress') {
        return this.progressTasks.splice(index, 1);
      }

      if (status === 'done') {
        return this.doneTasks.splice(index, 1);
      }

      return this.pendingTasks.splice(index, 1);
    }
  }
})
