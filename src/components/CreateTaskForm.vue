<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        size="large"
        class="ma-3 mb-10"
        v-bind="props"
        text="Create New Task"
        color="primary"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="New Task">
        <div class="pa-5 mt-3">
          <v-text-field
            class="mb-5"
            :counter="10"
            label="Title"
            required
            hide-details
            v-model="title"
          ></v-text-field>

          <v-textarea
            class="mb-5"
            :counter="10"
            label="Description"
            required
            hide-details
            v-model="description"
          ></v-textarea>

          <v-combobox
            label="Label"
            item-value="name"
            :items="taskStore.getLabelNames"
            v-model="label"
          ></v-combobox>

          <v-text-field
            class="mb-5"
            :counter="10"
            label="Estimated Time"
            required
            hide-details
            type="date"
            v-model="estimatedTime"
          ></v-text-field>

          <v-select
            label="Board"
            :items="['Pending', 'Progress', 'Done']"
            v-model="status"
          ></v-select>

          <Files :on-file-change="onFileUploadChange" />
        </div>

        <v-card-actions class="pa-5">
          <v-spacer></v-spacer>
          <v-btn
            text="Create"
            color="primary"
            variant="elevated"
            size="large"
            @click="() => {
              onClickCreate();
              isActive.value = false;
            }"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useTaskStore, TStatus, IFile } from '@/store/task';
import { ref } from 'vue';
import Files from '@/components/Files.vue';

const taskStore = useTaskStore();

const title = ref('');
const description = ref('');
const label = ref('');
const estimatedTime = ref('');
const status = ref<TStatus>('Pending');
const attachments = ref<IFile[]>([]);

const resetForm = () => {
  title.value = '';
  description.value = '';
  label.value = '';
  estimatedTime.value = '';
}

const onFileUploadChange = (uploadedFiles: IFile[]) => {
  attachments.value = [...uploadedFiles];
}

const onClickCreate = () => {
  if (!taskStore.labels[label.value] && label.value.trim() !== '') {
    taskStore.addNewLabel(label.value);
  }

  taskStore.addTask({
    description: description.value,
    title: title.value,
    estimatedTime: estimatedTime.value,
    id: taskStore.uniqueId,
    label: label.value,
    files: attachments.value,
    comments: [],
  }, status.value);

  taskStore.increaseUniqueId();
  resetForm();
}
</script>
