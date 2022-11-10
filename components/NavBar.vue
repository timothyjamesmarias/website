<script setup></script>

<template>
  <nav>
    <ul class="flex p-4 justify-center">
      <li>
        <NuxtLink to="/" class="text-3xl px-2 text-zinc-50">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/posts" class="text-3xl px-2 text-zinc-50"
          >Posts</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  font-family: Raleway;
  font-weight: 200;
}
</style>
