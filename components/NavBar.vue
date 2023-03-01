<script setup lang="ts">
  const showMenu: Ref<boolean> = ref(false);
</script>
<template>
<nav class="navbar bg-secondary">
    <NavItem :href="'/'" class="flex-1">
        Timothy Marias
    </NavItem>
    <div class="flex-none hidden sm:block">
      <NavItem :href="'/#contact'">
          <font-awesome-icon :icon="['fas', 'envelope']" />
      </NavItem>
      <NavItem :href="'/blog'" class="ml-6">
          <font-awesome-icon :icon="['fas', 'book']" />
      </NavItem>
      <a href="/rss.xml" class="text-2xl hover:text-secondary-content ml-6">
          <font-awesome-icon :icon="['fas', 'rss']" />
      </a>
      <NavItem :href="'https://github.com/timothyjamesmarias'" class="ml-6">
          <font-awesome-icon :icon="['fab', 'github']" />
      </NavItem>
    </div>
    <div class="flex-none sm:hidden dropdown dropdown-end">
      <label tabindex="0" class="text-2xl hover:text-secondary-content">
        <font-awesome-icon :icon="['fas', 'bars']" class=""/>
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box">
        <li>
          <NavItem :href="'/#contact'">
              <font-awesome-icon :icon="['fas', 'envelope']" />
          </NavItem>
        </li>
        <li>
          <NavItem :href="'/blog'">
              <font-awesome-icon :icon="['fas', 'book']" />
          </NavItem>
        </li>
        <li>
          <a href="/rss.xml" class="text-2xl hover:text-secondary-content">
              <font-awesome-icon :icon="['fas', 'rss']" />
          </a>
        </li>
        <li>
          <NavItem :href="'https://github.com/timothyjamesmarias'">
              <font-awesome-icon :icon="['fab', 'github']" />
          </NavItem>
        </li>
      </ul>
    </div>
</nav>
</template>
