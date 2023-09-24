<style>
</style>

<template>
  <v-container class="pa-0">
    <TaskForm />

    <v-row no-gutters>
      <ProgressBar />

      <SearchBar :on-filter-change="handleFilterChange" />

      <Column title="Pending">
        <draggable 
          v-model="taskStore.pendingTasks" 
          group="tasks" 
          style="min-height: 600px;"
          item-key="id"
        >
          <template #item="{element}">
            <TaskCard :task="element" :search-value="searchValue" />
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
            <TaskCard :task="element" :search-value="searchValue" />
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
            <TaskCard :task="element" :search-value="searchValue" />
          </template>
        </draggable>
      </Column>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { useTaskStore } from '@/store/task';

import Column from '@/components/Column.vue';
import TaskCard from '@/components/TaskCard.vue';
import TaskForm from '@/components/TaskForm.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

const taskStore = useTaskStore();
const searchValue = ref('');

const handleFilterChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  searchValue.value = target.value;
}
</script>
