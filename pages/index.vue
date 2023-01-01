<script setup lang="ts">
const projectInfo = {
  Regeneshare: {
    src: "/img/regeneshare.png",
    name: "RegeneShare",
    description: "A p2p rental marketplace for farm equipment and services.",
    href: "https://regeneshare.com",
    list: [
      "Ruby on Rails",
      "PostgreSQL",
      "Bootstrap",
      "Mapbox",
      "Stripe",
    ],
  },
  RallyToFlag: {
    src: "/img/rallytoflag.jpg",
    name: "Rally To Flag",
    description: "A central hub for finding Renaissance Faires and similar events.",
    href: "http://staging.rallytoflag.com",
    list: [
      "Laravel",
      "Vue",
      "Inertia",
      "TailwindCSS",
      "MySQL",
      "Mapbox",
    ],
    github: "https://github.com/rallytoflag/rallytoflag",
  },
  MariusArmory: {
    src: "/img/mariusarmory.png",
    name: "Marius Armory",
    description: "Landing page for Marius Armory",
    href: "https://mariusarmory.com",
    list: [
      "Nuxt",
    ],
    github: "https://github.com/MariusArmory/landing-page-front-end",
  },
};
</script>
<template>
<div>
  <GreetingsText>
  Hey, my name's Tim and I'm a full stack web dev obsessed with Laravel and Vue.
  </GreetingsText>
  <ProseH1 id="projects">
  My Projects
  </ProseH1>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <ProjectCell v-for="project in projectInfo" :src="project.src" :name="project.name" :description="project.description" :href="project.href" :list="project.list" />
  </div>
</div>
</template>
