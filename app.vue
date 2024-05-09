import { NuxtLayout } from '#build/components';
<template>
  <div>
    <NavigationBar class="sticky top-0 bg-white z-[1001]" />
    <NuxtLayout class="z-10 pt-4">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
// import NavigationBar from './components/NavBar.vue'
</script>
