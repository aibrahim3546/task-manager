<template>
  <div>
    <v-card
      width="100%"
      :elevation=2
      :hover="true"
      :ripple="true"
      class="mb-3"
      @click="onClickCard"
    >
      <template v-slot:title>
        {{ task.title }}
      </template>
  
      <template v-slot:subtitle>
        {{ task.description }}
      </template>
  
      <TaskEditForm :task="task" :is-active="isOpenDialog" />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TaskEditForm from './TaskEditForm.vue';

const props = defineProps(['task'])
const { task } = props;

const isOpenDialog = ref(false);

const onClickCard = () => {
  isOpenDialog.value = true;
}
</script>
