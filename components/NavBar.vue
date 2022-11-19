<template>
<nav class="flex justify-between align-center p-4 xs:px-0 xs:py-2 sticky top-0 select-none bg-background">
    <div>
        <NavItem :href="'/'">
        Home
        </NavItem>
        <NavItem :href="'/projects'">
        Projects
        </NavItem>
        <NavItem :href="'/posts'">
        Blog
        </NavItem>
    </div>
        <a href="https://github.com/timothyjamesmarias" class="text-2xl text-white hover:text-blue">
            <font-awesome-icon :icon="['fab', 'github']" />
        </a>
</nav>
</template>

<style scoped>
nav {
}
</style>
