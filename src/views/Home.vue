<template>
  <v-container class="pa-0">
    <TaskForm />

    <v-row no-gutters>

      <Column title="Pending">
        <draggable 
          v-model="taskStore.pendingTasks" 
          group="tasks" 
          style="min-height: 600px;"
          item-key="id"
        >
          <template #item="{element}">
            <TaskCard :task="element" />
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
            <TaskCard :task="element" />
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
            <TaskCard :task="element" />
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

const taskStore = useTaskStore();
</script>
