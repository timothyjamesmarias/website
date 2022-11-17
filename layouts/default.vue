<template>
        <NavBar />
    <div class="xl:mx-40 md:mx-10 sm:mx-10 xs:mx-10">
        <slot />
    </div>
</template>

<style global>
html,
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
body {
    background-color: #16171E;
}
</style>
