<template>
  <footer class="footer footer-center bg-base-300 flex justify-center p-20">
      <NavItem :href="'/#contact'">
          <font-awesome-icon :icon="['fas', 'envelope']" />
      </NavItem>
      <NavItem :href="'/blog'" class="ml-6">
          <font-awesome-icon :icon="['fas', 'book']" />
      </NavItem>
      <NavItem :href="'/rss'" class="ml-6">
          <font-awesome-icon :icon="['fas', 'rss']" />
      </NavItem>
      <NavItem :href="'https://github.com/timothyjamesmarias'" class="ml-6">
          <font-awesome-icon :icon="['fab', 'github']" />
      </NavItem>
  </footer>
</template>
