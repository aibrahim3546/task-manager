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
        <v-form @submit.prevent ref="form">
          <div class="pa-5 mt-3">
            <v-text-field
              class="mb-5"
              label="Title"
              required
              v-model="title"
              :rules="[(val) => val.trim() ? true : 'Title is required']"
            ></v-text-field>
  
            <v-textarea
              class="mb-5"
              label="Description"
              required
              v-model="description"
              :rules="[(val) => val.trim() ? true : 'Description is required']"
            ></v-textarea>
  
            <v-combobox
              label="Label"
              class="mb-5"
              :items="taskStore.getLabelNames"
              v-model="label"
              :rules="[(val) => val.trim() ? true : 'Label is required']"
            ></v-combobox>
  
            <v-text-field
              class="mb-5"
              label="Estimated Time"
              required
              type="date"
              v-model="estimatedTime"
              :rules="[(val) => val.trim() ? true : 'Estimated Time is required']"
            ></v-text-field>
  
            <v-select
              label="Board"
              :items="['Pending', 'Processing', 'Done']"
              v-model="status"
            ></v-select>
  
            <Files :on-file-change="onFileUploadChange" />
          </div>

          <v-card-actions class="pa-5">
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              text="Create"
              color="primary"
              variant="elevated"
              size="large"
              @click="() => {
                const closeDialog = () => {
                  isActive.value = false;
                }

                onClickCreate(closeDialog);
              }"
            ></v-btn>
          </v-card-actions>
        </v-form>
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
const form = ref<any>(null);

const resetForm = () => {
  title.value = '';
  description.value = '';
  label.value = '';
  estimatedTime.value = '';
}

const onFileUploadChange = (uploadedFiles: IFile[]) => {
  attachments.value = [...uploadedFiles];
}

const onClickCreate = async (closeDialog: () => void) => {
  if (form.value) {
    const error = await form.value.validate();
  
    if (error.valid) {
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
      closeDialog();
    }
  }

}
</script>
