<template>
  <v-col sm="12" class="pa-3 mb-4">
    <v-card class="pa-4" style="border: 1px solid #eeeeee">
      <p class="text-h6 mb-4">Sprint Progress</p>

      <div class="d-flex align-center">
        <div class="flex-fill">
          <v-progress-linear :model-value="taskStore.taskCompletionRate"></v-progress-linear>
        </div>
        <div class="pl-3">
          <p class="text-subtitle-2">{{ taskStore.taskCompletionRate }}% Done</p>
        </div>
      </div> 
    </v-card>
  </v-col>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/store/task';


const taskStore = useTaskStore();
</script>
