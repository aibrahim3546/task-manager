<style>
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
      ref="file"
      style="display: none;"
      @change="handleFileUpload"
      multiple
    />

    <p class="text-subtitle-2 mb-4">
      Attachments
    </p>

    <div class="file-container ">
      <div @click="$refs.file.click()" class="file">
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
          <v-icon
            size="large"
            color="rgb(100, 149, 237)"
            icon="mdi-file-document-outline"
          ></v-icon>

          <v-icon
            class="close-icon"
            size="large"
            color="rgb(100, 149, 237)"
            icon="mdi-close-circle"
            @click="(e) => onClickRemoveFile(e, index)"
          ></v-icon>
        </div>
  
        <p class="text-body-2 text-truncate">{{ file.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const files = ref<any[]>([]);

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const uploadedFiles: any[] = [];

  if (target.files) {
    Object.keys(target.files).map((key) => {
      if (target.files) {
        const getFile = target.files[Number(key)];

        uploadedFiles.push({
          type: getFile.type,
          url: URL.createObjectURL(getFile),
          name: getFile.name,
        })
      }
    });
  }

  files.value = [ ...uploadedFiles ];
}

const onClickFile = (url: string) => {
  window.open(url, '_blank');
}

const onClickRemoveFile = (e: Event, index: number) => {
  e.stopPropagation();
  files.value.splice(index, 1);
}
</script>