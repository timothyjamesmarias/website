<script setup lang="ts">
import "@fontsource/iosevka"
</script>
<template>
  <div class="min-h-screen bg-background font-main text-main selection:bg-highlight">
    <NavBar />
    <main class="mx-4 sm:mx-10 md:mx20 lg:mx-44">
      <slot />
    </main>
  </div>
</template>

<style global>
html::-webkit-scrollbar {
    display: none;
}
</style>
