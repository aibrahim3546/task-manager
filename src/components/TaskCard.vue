<style>
  .card-border {
    border: 1px solid transparent;
  }

  .disabled {
    opacity: 0.25;
  }

  .active {
    border: 1px solid rgb(100, 149, 237);
  }

  .label-container {
    margin-top: 24px;
    padding: 4px 12px;
    border-radius: 5px;
    color: #ffffff;
    font-weight: bold;
    display: inline-block;
  }
</style>

<template>
  <div>
    <v-card
      width="100%"
      :elevation=2
      :hover="true"
      :ripple="true"
      :class="`mb-3 card-border ${getHiglightClass()}`"
      @click="onClickCard"
    >
      <v-card-item>
        <h6 class="text-h6 mb-1">{{ task.title }}</h6>

        <p class="text-subtitle1 text-truncate">{{ task.description }}</p>

        <div class="d-flex justify-end" v-if="task.label">
          <div
            class="label-container"
            :style="{ backgroundColor: labelBgColor }"
          >
            <p class="text-body-2">
              {{ task.label }}
            </p>
          </div>
        </div>
      </v-card-item>  
    </v-card>

    <TaskDialog
      :task="task"
      :is-active="isOpenDialog"
      :set-is-active="setIsOpenDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TaskDialog from './TaskDialog.vue';
import { computed } from 'vue';
import { ITask, useTaskStore } from '@/store/task';
import { storeToRefs } from 'pinia';

interface TaskCardProps {
  task: ITask,
  searchValue: string
}

const { labels } = storeToRefs(useTaskStore());
const props = defineProps<TaskCardProps>();

const task = computed(() => props.task);
const searchValue = computed(() => props.searchValue);
const isOpenDialog = ref(false);
const labelBgColor = labels.value[task.value.label];

const onClickCard = () => {
  isOpenDialog.value = true;
}

const getHiglightClass = () => {
  if (searchValue.value.trim() === '') {
    return '';
  }

  if (
    task.value.title.includes(searchValue.value) ||
    task.value.description.includes(searchValue.value) ||
    task.value.label.includes(searchValue.value)
  ) {
    return 'active';
  }

  return 'disabled';
}

const setIsOpenDialog = (val: boolean) => {
  isOpenDialog.value = val;
}
</script>
