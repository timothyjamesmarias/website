<script setup lang="ts">
import "@fontsource/iosevka"
</script>
<template>
  <div class="min-h-screen bg-background font-main text-main selection:bg-highlight">
    <NavBar />
    <main class="">
      <slot />
    </main>
  </div>
</template>

<style global>
html {
  scroll-behavior: smooth;
}
html::-webkit-scrollbar {
    display: none;
}
</style>
