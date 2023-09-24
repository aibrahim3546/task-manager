<template>
  <v-dialog
    width="100%"
    max-width="840px"
    max-height="840px"
    style="overflow-y: scroll;"
    v-model="isOpenDialog"
  >
    <v-card>
      <v-card-item>
        <TaskDetails
          v-if="isOpenDialog"
          :task="task"
          :closeDialog="() => isOpenDialog = false"
          is-dialog
        />
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ITask } from '@/store/task';
import { ref, watch } from 'vue';
import { computed } from 'vue';
import TaskDetails from './TaskDetails.vue';

interface TaskDialogProps {
  task: ITask
  isActive: boolean
  setIsActive: (val: boolean) => void
}

const props = defineProps<TaskDialogProps>();
const isActive = computed(() => props.isActive);
const task = computed(() => props.task);

const isOpenDialog = ref(false);

watch(isActive, (newState) => isOpenDialog.value = newState);
watch(isOpenDialog, (newState) => props.setIsActive(newState));
</script>
