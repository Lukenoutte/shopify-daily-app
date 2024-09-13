<template>
  <UButtonGroup size="sm" orientation="horizontal" class="mr-8 w-full">
    <USelect
      v-model="price"
      :placeholder="placeholder"
      class="w-full lg:w-[140px]"
      :disabled="isLoading"
      :options="prices"
      option-attribute="name"
    >
      <template #leading>
        <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5" />
      </template>
    </USelect>
    <UButton
      v-if="price"
      title="Clear"
      icon="i-heroicons-x-mark"
      color="gray"
      @click="price = ''"
    />
  </UButtonGroup>
</template>

<script setup>
import { prices } from "../utils";
const emit = defineEmits(["onChange"]);
const props = defineProps({
  currentPrice: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Price",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const price = ref(props.currentPrice);
watch([price], () => emit("onChange", price.value));
</script>
