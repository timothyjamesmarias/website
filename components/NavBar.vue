<template>
<nav class="flex justify-between align-center p-4 xs:p-0 sticky select-none">
    <div>
        <NavItem :href="'/'">
        Home
        </NavItem>
        <NavItem :href="'/projects'">
        Projects
        </NavItem>
        <NavItem :href="'/posts'">
        Posts
        </NavItem>
    </div>
        <a href="https://github.com/timothyjamesmarias" class="text-xl text-white hover:text-blue">
            <font-awesome-icon :icon="['fab', 'github']" />
        </a>
</nav>
</template>

<style scoped>
nav {
}
</style>
