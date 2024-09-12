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
              class="mr-1"
              placeholder="Filter products..."
            />
            <UButton
              icon="i-heroicons-magnifying-glass"
              :disabled="isLoading"
              type="submit"
            />
          </form>
          <div class="flex w-full justify-center mt-4 lg:mt-0">
            <USelect
              v-model="priceMin"
              placeholder="Price Min"
              class="mr-8 w-[130px]"
              :disabled="isLoading"
              :options="prices"
              option-attribute="name"
            >
              <template #leading>
                <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5" />
              </template>
            </USelect>
            <USelect
              v-model="priceMax"
              placeholder="Price Max"
              class="w-[140px]"
              :disabled="isLoading"
              :options="prices"
              option-attribute="name"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-currency-dollar"
                  class="w-5 h-5"
                /> </template
            ></USelect>
          </div>
        </div>
        <div class="flex justify-center mt-4 lg:mt-0">
          <strong v-show="!isLoading">Total: {{ productsCount }}</strong>
        </div>
      </div>
      <UTable
        v-if="isLoading"
        class="min-h-[300px] mt-4"
        :loading="isLoading"
      />
      <UTable v-else :rows="productsData" :columns="columnProducts">
        <template #publishedAt-data="{ row }">
          {{ moment(row.publishedAt).format("MM/DD/YYYY hh:mm") }}
        </template>
        <template #updatedAt-data="{ row }">
          {{ moment(row.updatedAt).format("MM/DD/YYYY hh:mm") }}
        </template>
        <template #expand="{ row }">
          <UCard class="p-4">
            <UTable :rows="row.variants" :columns="columnVariants">
              <template #weight-data="{ row: rowVariants }">
                {{ `${rowVariants.weight} ${rowVariants.weightUnit}` }}
              </template>
              <template #price-data="{ row: rowVariants }">
                {{
                  `${formatCurrency(rowVariants.price, rowVariants.priceCurrency)}`
                }}
              </template>
              <template #taxable-data="{ row: rowVariants }">
                <UBadge
                  :color="rowVariants.taxable ? 'primary' : 'gray'"
                  variant="solid"
                >
                  <UIcon
                    v-if="rowVariants.taxable"
                    name="i-heroicons-check-circle"
                    class="w-5 h-5"
                  />
                  <UIcon v-else name="i-heroicons-x-circle" class="w-5 h-5" />
                </UBadge>
              </template>
              <template #requiresShipping-data="{ row: rowVariants }">
                <UBadge
                  :color="rowVariants.requiresShipping ? 'primary' : 'gray'"
                  variant="solid"
                >
                  <UIcon
                    v-if="rowVariants.requiresShipping"
                    name="i-heroicons-check-circle"
                    class="w-5 h-5"
                  />
                  <UIcon v-else name="i-heroicons-x-circle" class="w-5 h-5" />
                </UBadge>
              </template>
            </UTable>
          </UCard>
        </template>
      </UTable>
      <div
        class="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
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
import moment from "moment";
import { getProducts } from "../services/api";
const inputText = ref("");
const page = ref(1);
const limit = ref(5);
const isLoading = ref(false);
const productsData = ref([]);
const productsCount = ref(0);
const priceMin = ref("");
const priceMax = ref("");

const formatCurrency = (value, currencyCode) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};

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

const columnProducts = [
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

const columnVariants = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "priceCurrency",
    label: "Currency",
  },
  {
    key: "weight",
    label: "Weight",
  },
  {
    key: "taxable",
    label: "Taxable",
  },
  {
    key: "requiresShipping",
    label: "Requires Shipping",
  },
];

const prices = [
  {
    name: "",
    value: undefined,
  },
  {
    name: "$ 5",
    value: 5,
  },
  {
    name: "$ 10",
    value: 10,
  },
  {
    name: "$ 20",
    value: 20,
  },
  {
    name: "$ 100",
    value: 100,
  },
  {
    name: "$ 200",
    value: 200,
  },
  {
    name: "$ 500",
    value: 500,
  },
  {
    name: "$ 1.000",
    value: 1000,
  },
  {
    name: "$ 10.000",
    value: 10000,
  },
];
</script>
