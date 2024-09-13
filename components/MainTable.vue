<template>
  <div>
    <UTable v-if="isLoading" class="min-h-[300px] mt-4" :loading="isLoading" />
    <UTable v-else :rows="data" :columns="columnProducts">
      <template #publishedAt-data="{ row }">
        {{ moment(row.publishedAt).format("MM/DD/YYYY hh:mm A") }}
      </template>
      <template #updatedAt-data="{ row }">
        {{ moment(row.updatedAt).format("MM/DD/YYYY hh:mm A") }}
      </template>
      <template v-if="data.length" #expand="{ row }">
        <UCard class="p-4">
          <UCarousel
            v-slot="{ item }"
            :items="row.images"
            :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
            indicators
            class="rounded-lg overflow-hidden h-[350px] w-[300px] md:w-full"
          >
            <img
              :src="item.src"
              class="h-[300px] lg:h-auto lg:w-full"
              draggable="false"
            />
          </UCarousel>
          <VariantsTable :data="row.variants" />
        </UCard>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import moment from "moment";
import { columnProducts } from "~/utils";
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
