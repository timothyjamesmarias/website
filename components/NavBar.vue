<template>
<nav class="flex py-4 sticky">
    <ul class="flex justify-center">
        <li>
            <NuxtLink to="/" class="text-5xl pr-4 text-white hover:text-blue">
            Home
            </NuxtLink>
        </li>
        <li>
            <NuxtLink to="/projects" class="text-5xl pr-4 text-white hover:text-blue">
            Projects
            </NuxtLink>
        </li>
        <li>
            <NuxtLink to="/posts" class="text-5xl pr-4 text-white hover:text-blue">
            Posts
            </NuxtLink>
        </li>
    </ul>
    <hr>
</nav>
</template>

<style scoped>
ul {
    font-family: Teko;
}
</style>
