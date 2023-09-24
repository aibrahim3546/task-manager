<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col sm="12">
        <v-card style="border: 1px solid #cccccc">
          <v-card-item>
            <TaskDetails v-if="task" :task="task" />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import TaskDetails from '@/components/TaskDetails.vue';
import { useTaskStore } from '@/store/task';
import { useRoute } from 'vue-router';

const taskStore = (useTaskStore());
const route = useRoute();
const task = taskStore.getTaskByIdAndStatus(Number(route.params.id));
</script>
