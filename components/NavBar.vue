<template>
<nav class="flex justify-between p-4 xs:p-0 sticky">
    <div>
        <NavItem :href="'/'">
        Timothy Marias
        </NavItem>
    </div>
    <ul class="flex">
        <li>
            <NavItem :href="'/projects'">
            Projects
            </NavItem>
        </li>
        <li class="pl-6">
            <NavItem :href="'/posts'">
            Posts
            </NavItem>
        </li>
    </ul>
    <div>
        <a href="https://github.com/timothyjamesmarias" class="text-xl text-white hover:text-blue">
            <font-awesome-icon :icon="['fab', 'github']" />
        </a>
    </div>
</nav>
</template>

<style scoped>
nav {
}
</style>
