<template>
  <v-col sm="12" class="pa-3">
    <div class="d-flex">
      <div class="flex-fill">
        <v-text-field
          placeholder="Search..."
          @input="props.onTextChange"
        ></v-text-field>
      </div>
      <div style="width: 32px;"></div>
      <div style="width: 200px;">
        <v-text-field
          label="From"
          type="date"
          @input="props.onChangeFromDate"
        ></v-text-field>
      </div>
      <div style="width: 12px;"></div>
      <div style="width: 200px;">
        <v-text-field
          label="To"
          type="date"
          @input="props.onChangeToDate"
        ></v-text-field>
      </div>
    </div>
  </v-col>
</template>

<script lang="ts" setup>
interface SearchBarProps {
  onChangeFromDate: (e: Event) => void
  onChangeToDate: (e: Event) => void
  onTextChange: (e: Event) => void
}

const props = defineProps<SearchBarProps>();
</script>
