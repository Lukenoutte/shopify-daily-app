<template>
  <header class="h-[50px] flex items-center justify-between px-4">
    <span class="text-primary font-bold"> Shopify Daily </span>
    <UButton
      color="white"
      :ui="{ rounded: 'rounded-xl' }"
      :icon="isDarkMode ? 'i-heroicons-sun-solid' : 'i-heroicons-moon-solid'"
      @click="setColorTheme(isDarkMode ? 'light' : 'dark')"
    />
  </header>
</template>

<script setup>
const setColorTheme = (newTheme) => {
  useColorMode().preference = newTheme;
};

const isDarkMode = computed(() => {
  const colorMode = useColorMode().preference;
  return colorMode === "dark";
});
</script>
