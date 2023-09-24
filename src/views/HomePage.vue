<style>
</style>

<template>
  <v-container class="pa-0">
    <CreateTaskForm />

    <v-row no-gutters>
      <ProgressBar />

      <SearchBar
        :on-text-change="handleFilterChange"
        :on-change-from-date="handleFromDateChange"
        :on-change-to-date="handleToDateChange"
      />

      <Column title="Pending">
        <draggable 
          v-model="taskStore.pendingTasks" 
          group="tasks" 
          style="min-height: 600px;"
          item-key="id"
        >
          <template #item="{element}">
            <div :style="{ display: showElement(element) ? 'block' : 'none' }">
              <TaskCard :task="element" :search-value="searchValue" />
            </div>
          </template>
        </draggable>
      </Column>

      <Column title="Progress">
        <draggable 
          v-model="taskStore.progressTasks" 
          group="tasks" 
          style="min-height: 600px;"
          item-key="id"
        >
          <template #item="{element}">
            <div :style="{ display: showElement(element) ? 'block' : 'none' }">
              <TaskCard :task="element" :search-value="searchValue" />
            </div>
          </template>
        </draggable>
      </Column>

      <Column title="Done">
        <draggable 
          v-model="taskStore.doneTasks" 
          group="tasks" 
          style="min-height: 600px;"
          item-key="id"
        >
          <template #item="{element}">
            <div :style="{ display: showElement(element) ? 'block' : 'none' }">
              <TaskCard :task="element" :search-value="searchValue" />
            </div>
          </template>
        </draggable>
      </Column>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { ref } from 'vue';
import { ITask, useTaskStore } from '@/store/task';

import Column from '@/components/Column.vue';
import TaskCard from '@/components/TaskCard.vue';
import CreateTaskForm from '@/components/CreateTaskForm.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import SearchBar from '@/components/SearchBar.vue';

const taskStore = useTaskStore();
const searchValue = ref('');
const fromDate = ref('');
const toDate = ref('');

const handleFilterChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  searchValue.value = target.value;
}

const handleFromDateChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  fromDate.value = target.value;
}

const handleToDateChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  toDate.value = target.value;
}

const showElement = (task: ITask): boolean => {
  const formatEstimatedTime = new Date(task.estimatedTime).getTime();
  const formatFromDate = new Date(fromDate.value).getTime();
  const formatToDate = new Date(toDate.value).getTime();

  if (fromDate.value && toDate.value) {
    return formatEstimatedTime >= formatFromDate && formatEstimatedTime <= formatToDate;
  }

  if (fromDate.value) {
    return formatEstimatedTime >= formatFromDate;
  }

  if (toDate.value) {
    return formatEstimatedTime <= formatToDate;
  }

  return true;
}
</script>
