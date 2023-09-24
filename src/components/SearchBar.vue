<template>
  <v-col sm="12" class="pa-3">
    <v-text-field
      placeholder="Search..."
      @input="props.onFilterChange"
    ></v-text-field>
  </v-col>
</template>

<script lang="ts" setup>
const props = defineProps(['onFilterChange']);
</script>
