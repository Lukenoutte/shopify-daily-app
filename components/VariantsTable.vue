<template>
  <UTable :rows="data" :columns="columnVariants">
    <template #weight-data="{ row: rowVariants }">
      {{ `${rowVariants.weight} ${rowVariants.weightUnit}` }}
    </template>
    <template #price-data="{ row: rowVariants }">
      {{ `${formatCurrency(rowVariants.price, rowVariants.priceCurrency)}` }}
    </template>
    <template #taxable-data="{ row: rowVariants }">
      <UBadge :color="rowVariants.taxable ? 'primary' : 'gray'" variant="solid">
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
</template>

<script setup>
import { columnVariants } from "~/utils";
const formatCurrency = (value, currencyCode) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
};

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
