<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NavBar />
  <slot />
</template>

<style global>
html,
body {
  height: 100vh;
}
body {
  margin-inline: 1rem;
  background-color: rgb(24 24 27);
}
</style>
