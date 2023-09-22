<template>
  <v-dialog
    width="100%"
    max-width="840px"
    max-height="700px"
    style="overflow-y: scroll;"
    v-model="isActive"
    v-click-outside="() => {
      console.log('herere');
    }"
  >
    <v-card title="Details">
      <div class="pa-5 d-flex" style="width: 100%;">
        <div class="flex-fill pr-5">
          <v-text-field
            class="mb-5"
            label="Title"
            hide-details
            v-model="task.title"
          ></v-text-field>

          <v-textarea
            class="mb-5"
            label="Description"
            v-model="task.description"
          ></v-textarea>

          <div>
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
          <v-combobox
            label="Label"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            v-model="task.label"
          ></v-combobox>

          <v-text-field
            label="Estimated Time"
            required
            hide-details
            type="date"
            v-model="task.estimatedTime"
          ></v-text-field>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps(['task', 'isActive']);
const isActive = computed(() => props.isActive);
const task = computed(() => props.task);
const newComment = ref('');

const onClickAddComment = () => {
  task.value.comments.unshift(newComment.value);
  newComment.value = '';
}
</script>
