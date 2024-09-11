<template>
  <div class="w-full px-4">
    <UCard>
      <div class="flex items-center justify-between">
        <div class="flex">
          <UInput
            v-model="inputText"
            class="mr-1"
            placeholder="Filter products..."
          />
          <UButton
            icon="i-heroicons-magnifying-glass"
            :disabled="isLoading"
            @click="callGetProducts"
          />
        </div>
        <strong>Total: {{ productsCount }}</strong>
      </div>
      <UTable :rows="productsData" :columns="columns" :loading="isLoading" />
      <div
        class="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="productsCount"
          :disabled="isLoading"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { getProducts } from "../services/api";
const inputText = ref("");
const page = ref(1);
const limit = ref(5);
const isLoading = ref(false);
const productsData = ref([]);
const productsCount = ref(0);

const callGetProducts = async () => {
  try {
    isLoading.value = true;
    const offset = page.value === 1 ? 0 : limit.value * page.value;
    const { data, count } = await getProducts({
      fts: inputText.value,
      limit: limit.value,
      offset,
    });
    productsData.value = data;
    productsCount.value = count;
  } finally {
    isLoading.value = false;
  }
};

callGetProducts();
watch([page, limit], () => callGetProducts());

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "vendor",
    label: "Vendor",
  },
  {
    key: "publishedAt",
    label: "Published At",
  },
  {
    key: "updatedAt",
    label: "Updated At",
  },
];
</script>
