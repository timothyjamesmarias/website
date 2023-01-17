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
};
</script>
<template>
<div class="snap-y snap-mandatory">
  <PageSection v-for="(project, key) in projectInfo" :key="key" :background="key % 2 === 0 ? 'bg-secondary' : 'bg-background'">
    <ProjectContainer :src="project.src" :name="project.name" :description="project.description" :href="project.href" :list="project.list" :github="project.github" />
  </PageSection>
</div>
</template>
