<style>
.image-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px dashed #cccccc;
  cursor: pointer;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.uploaded-file {
  border-style: solid;
  background-color: rgba(100, 149, 237, 0.1);
  border-color: rgba(100, 149, 237, 0.1);
}

.uploaded-file:hover {
  background-color: rgba(100, 149, 237, 0.25);
}

.uploaded-file > .close-icon {
  position: absolute;
  top: -10px;
  right: -10px;
}

.file-container {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 8px;
}
</style>

<template>
  <div>
    <input
      type="file"
      ref="fileRef"
      style="display: none;"
      @change="handleFileUpload"
      multiple
    />

    <p class="text-subtitle-2 mb-4">
      Attachments
    </p>

    <div class="file-container ">
      <div @click="onClickUpload" class="file">
        <v-icon
          size="large"
          color="#cccccc"
          icon="mdi-plus"
        ></v-icon>
      </div>
  
      <div style="width: 100px;" v-for="(file, index) in files" :key="file.url">
        <div
          class="file uploaded-file"
          @click="() => onClickFile(file.url)"
        >
          <div class="image-container">
            <img
              v-if="file.type.includes('image')"
              :src="file.url"
              style="object-fit: contain; width: 100px; height: 100px;"
            />
          
            <div v-else>
              <v-icon
                size="large"
                color="rgb(100, 149, 237)"
                icon="mdi-file-document-outline"
              ></v-icon>
              <p class="text-caption text-center">
                {{ file?.type.split('/')[1] || '' }}
              </p>
            </div>
          </div>

          <v-icon
            class="close-icon"
            size="large"
            color="rgb(100, 149, 237)"
            icon="mdi-close-circle"
            @click="(e: Event) => onClickRemoveFile(e, index)"
          ></v-icon>
        </div>
  
        <p class="text-body-2 text-truncate">{{ file.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IFile, ITask, useTaskStore } from '@/store/task';
import { computed, watch } from 'vue';

interface FilesProps {
  task?: ITask
  onFileChange?: (files: IFile[]) => void
}

const props = defineProps<FilesProps>();
const task = computed(() => props.task);
const taskStore = useTaskStore();
const fileRef = ref<any>(null);

const files = ref<IFile[]>(props.task ? props.task.files : []);

watch(files, (newState) => {
  if (props.onFileChange) {
    props.onFileChange(newState);
  }

  if (task.value) {
    taskStore.updateTask({ ...task.value, files: [ ...newState ] })
  }
})

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const newFiles: IFile[] = [];

  if (target.files) {
    Object.keys(target.files).map((key) => {
      if (target.files) {
        const getFile = target.files[Number(key)];
        const isFileExist = files.value.find((each) => each.name === getFile.name);

        if (!isFileExist)
        newFiles.push({
          type: getFile.type,
          url: URL.createObjectURL(getFile),
          name: getFile.name,
        })
      }
    });
  }

  files.value = [ ...files.value, ...newFiles ];
}

const onClickUpload = () => {
  fileRef.value.click()
}

const onClickFile = (url: string) => {
  window.open(url, '_blank');
}

const onClickRemoveFile = (e: Event, index: number) => {
  e.stopPropagation();
  files.value.splice(index, 1);
}
</script>
