// Utilities
import getRandomHexColor from '@/utils/generateRandomColors'
import { defineStore } from 'pinia'

export type TStatus = 'Pending' | 'Processing' | 'Done'

export interface IFile {
  name: string
  type: string
  url: string
}

export interface ITask {
  id: number
  title: string
  description: string
  label: string
  estimatedTime: string
  comments: string[],
  files: IFile[];
}

interface TaskStoreState {
  uniqueId: number
  pendingTasks: ITask[]
  progressTasks: ITask[]
  doneTasks: ITask[]
  labels: { [key: string]: string }
}

export const DEFAULT_LABELS: { [key: string]: string } = {
  'feature': '#ff6900',
  'bug': '#eb144c',
  'task': '#9900ef',
  'story': '#0693e3',
  'improvement': '#fcb900',
}

export const useTaskStore = defineStore('task', {
  state: (): TaskStoreState => ({
    uniqueId: 0,
    pendingTasks: [],
    progressTasks: [],
    doneTasks: [],
    labels: DEFAULT_LABELS,
  }),
  getters: {
    getLabelNames(): string[] {
      return Object.keys(this.labels).map((key) => {
        return key;
      })
    },
    getLabelColorKeys(): { [key: string]: string } {
      const labelColorKeys: { [key: string]: string } = {};

      Object.keys(this.labels).forEach((key) => {
        const value = this.labels[key];

        return labelColorKeys[value] = key;
      });

      return labelColorKeys;
    },
    taskCompletionRate(): number {
      const numberOfPendingTask = this.pendingTasks.length;
      const numberOfProgressTask = this.progressTasks.length;
      const numberOfDoneTask = this.doneTasks.length;
      const totalTask = numberOfPendingTask + numberOfProgressTask + numberOfDoneTask;

      if (totalTask === 0) {
        return totalTask;
      }

      return Math.round((numberOfDoneTask / totalTask) * 100);
    }
  },
  actions: {
    increaseUniqueId() {
      this.uniqueId = this.uniqueId + 1;
    },
    getTaskByIdAndStatus(id: number) {
      const allTasks = [...this.pendingTasks, ...this.progressTasks, ...this.doneTasks];
      return allTasks.find((each) => each.id === id);
    },
    addNewLabel(name: string) {
      const color = getRandomHexColor(this.getLabelColorKeys);
      this.labels[name] = color;
    },
    deleteTask(id: number) {
      let index = this.pendingTasks.findIndex((each) => each.id === id);

      if (index > -1) {
        return this.pendingTasks.splice(index, 1);
      }

      index = this.progressTasks.findIndex((each) => each.id === id);

      if (index > -1) {
        return this.progressTasks.splice(index, 1);
      }

      index = this.doneTasks.findIndex((each) => each.id === id);

      if (index > -1) {
        return this.doneTasks.splice(index, 1);
      }
    },
    addTask(task: ITask, status: TStatus) {
      if (status === 'Processing') {
        return this.progressTasks.push(task)
      }

      if (status === 'Done') {
        return this.doneTasks.push(task)
      }

      return this.pendingTasks.push(task)
    },
    updateTask(task: ITask) {
      let index = this.pendingTasks.findIndex((each) => each.id === task.id);

      if (index > -1) {
        return this.pendingTasks[index] = { ...task };
      }

      index = this.progressTasks.findIndex((each) => each.id === task.id);

      if (index > -1) {
        return this.progressTasks[index] = { ...task };
      }

      index = this.doneTasks.findIndex((each) => each.id === task.id);

      if (index > -1) {
        return this.doneTasks[index] = { ...task };
      }
    } 
  }
})
