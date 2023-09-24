<style>
.link {
  cursor: pointer;
  color: #000000;
}

.link:hover {
  opacity: 0.6;
}
</style>

<template>
  <div class="pa-1">
    <div class="d-flex aligns-center justify-end mb-10">
      <div>
        <router-link class="link" :to="{ name: 'Task Details', params: { id: task.id } }">
          <h6 class="text-h6">
            DETAILS-{{ task.id }}
          </h6>
        </router-link>
      </div>

      <div class="flex-fill"></div>

      <div class="d-flex justify-end">
        <v-btn
          v-if="!isEdit"
          text="edit"
          title="Edit"
          color="primary"
          @click="toggleEdit"
          size="small"
        ></v-btn>
  
        <div v-if="isEdit" class="d-flex justify-end">
          <v-btn
            text="Cancel"
            color="error"
            @click="toggleEdit"
            size="small"
          ></v-btn>
          <div class="ml-4"></div>
          <v-btn
            text="Save"
            color="success"
            @click="onClickSave"
            size="small"
          ></v-btn>
        </div>

        <v-icon
          v-if="props.closeDialog"
          size="large"
          color="#888888"
          icon="mdi-close"
          class="ml-10"
          style="cursor: pointer;"
          @click="props.closeDialog"
        ></v-icon>
      </div>
    </div>

    <div class="d-flex" style="width: 100%;">
      <div class="flex-fill pr-5">
        <v-text-field
          class="mb-5"
          label="Title"
          hide-details
          v-model="taskDetails.title"
          :variant="isEdit ? undefined : 'plain'"
          :readonly="!isEdit"
        ></v-text-field>
  
        <v-textarea
          class="mb-5"
          label="Description"
          hide-details
          v-model="taskDetails.description"
          :variant="isEdit ? undefined : 'plain'"
          :readonly="!isEdit"
        ></v-textarea>
  
        <Files :task="task" />
  
        <div class="mt-5">
          <v-divider></v-divider>
  
          <div class="text-subtitle-2 my-5">
            Comments
          </div>
  
          <div>
            <v-textarea
              class="my-4"
              placeholder="Add a comment..."
              required
              hide-details
              v-model="newComment"
              rows="2"
            ></v-textarea>
  
            <div class="text-right">
              <v-btn
                text="Add"
                color="primary"
                variant="outlined"
                size="small"
                :disabled="newComment.trim() === ''"
                class="mb-5"
                @click="onClickAddComment"
              ></v-btn>
            </div>
          </div>
  
          <div
            class="d-flex align-center mb-4 ml-4"
            v-for="comment in task.comments"
            :key="comment"
          >
            <div>
              <v-icon
                size="large"
                color="black"
                icon="mdi-comment-outline"
              ></v-icon>
            </div>
            <div class="ml-4">
              <p class="text-body-1">
              {{ comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <div style="width: 275px; border-left: 1px solid #cccccc;" class="pl-5">
        <v-text-field
          label="Label"
          v-model="taskDetails.label"
          readonly
          variant="plain"
        ></v-text-field>
  
        <v-text-field
          label="Estimated Time"
          required
          hide-details
          type="date"
          v-model="taskDetails.estimatedTime"
          readonly
          variant="plain"
        ></v-text-field>
      </div>
    </div>

    <div class="text-center">
      <v-btn
        text="delete"
        color="error"
        class="mt-8 mb-5"
        width="480px"
        @click="onClickDelete"
        variant="outlined"
      ></v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITask, useTaskStore } from '@/store/task';
import { ref } from 'vue';
import { computed } from 'vue';

import Files from './Files.vue';
import { RouterLink } from 'vue-router';

interface TaskDetailsProps {
  task: ITask;
  closeDialog?: () => void
  isDialog?: boolean
}

const taskStore = useTaskStore();

const props = defineProps<TaskDetailsProps>();
const task = computed(() => props.task);

const newComment = ref('');
const taskDetails = ref({ ...props.task });
const isEdit = ref(false);

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
}

const onClickAddComment = () => {
  task.value.comments.unshift(newComment.value);
  newComment.value = '';
}

const onClickSave = () => {
  taskStore.updateTask(taskDetails.value);
  toggleEdit();
}

const onClickDelete = () => {
  taskStore.deleteTask(task.value.id);

  if (props.closeDialog && props.isDialog) {
    props.closeDialog();
  }
}
</script>
