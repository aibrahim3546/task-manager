<template>
  <v-col cols="12" sm="4">
    <v-sheet class="ma-1 pa-1">
      <div class="text-h6 mb-2">
        {{ props.title }}
      </div>
      <v-sheet
        color="#eeeeee"
        rounded
        class="pa-2"
      >
        <slot></slot>
      </v-sheet>
    </v-sheet>
  </v-col>
</template>

<script lang="ts" setup>
const props = defineProps(['title']);
</script>
