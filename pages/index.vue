<template>
  <div class="w-full px-4">
    <UCard color="gray">
      <div class="lg:flex items-center justify-between">
        <div class="lg:flex items-center">
          <form
            class="w-full flex justify-center lg:mr-16"
            @submit.prevent="callGetProducts"
          >
            <UInput
              v-model="inputText"
              class="mr-1 w-full"
              placeholder="Filter products..."
            />
            <UButton
              icon="i-heroicons-magnifying-glass"
              :disabled="isLoading"
              type="submit"
            />
          </form>
          <div
            class="flex-col flex lg:flex-row w-full justify-center mt-4 lg:mt-0"
          >
            <SelectPrice
              :is-loding="isLoading"
              :current-price="priceMin"
              class="mr-8 w-full"
              placeholder="Price Min"
              @on-change="(price) => (priceMin = price)"
            />
            <SelectPrice
              :is-loding="isLoading"
              :current-price="priceMax"
              class="mt-3 lg:mt-0"
              placeholder="Price Max"
              @on-change="(price) => (priceMax = price)"
            />
          </div>
        </div>
        <div class="flex justify-center mt-4 lg:mt-0">
          <strong v-show="!isLoading">Total: {{ productsCount }}</strong>
        </div>
      </div>
      <MainTable :data="productsData" :is-loading="isLoading" />
      <div
        class="flex flex-col lg:flex-row items-center lg:justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="lg:w-[100px]" />
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="productsCount"
          :disabled="isLoading"
        />
        <USelect
          v-model="limit"
          class="mt-3 lg:mt-0"
          :disabled="isLoading"
          :options="[5, 10, 20, 40]"
        >
          <template #leading>
            <UIcon name="i-heroicons-bars-4" bars-4 />
          </template>
        </USelect>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { getProducts } from "../services/api";
const inputText = ref("");
const page = ref(1);
const limit = ref(5);
const isLoading = ref(false);
const productsData = ref([]);
const productsCount = ref(0);
const priceMin = ref("");
const priceMax = ref("");

const callGetProducts = async () => {
  try {
    isLoading.value = true;
    const offset = (page.value - 1) * limit.value;
    const { data, count } = await getProducts({
      fts: inputText.value,
      limit: limit.value,
      offset,
      priceMin: priceMin.value,
      priceMax: priceMax.value,
    });
    productsData.value = data;
    productsCount.value = count;
  } finally {
    isLoading.value = false;
  }
};

callGetProducts();
watch([page, limit, priceMin, priceMax], () => callGetProducts());
</script>
