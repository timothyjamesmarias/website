<script setup lang="ts">
const projectInfo = {
  Regeneshare: {
    src: "/img/regeneshare.png",
    name: "RegeneShare",
    description: "A peer-to-peer rental marketplace for farm equipment and services.",
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
    href: "https://staging.rallytoflag.com",
    list: [
      "Laravel",
      "Vue",
      "Inertia",
      "Tailwind",
      "MySQL",
      "Mapbox",
    ],
    github: "https://github.com/rallytoflag/rallytoflag",
  },
  MariusArmory: {
    src: "/img/mariusarmory.png",
    name: "Marius Armory",
    businesslink: "https://www.facebook.com/people/Marius-Armory/100076373375133/?mibextid=ZbWKwL",
    description: "Online store for ",
    href: "https://staging.shop.mariusarmory.com",
    list: [
      "Laravel",
      "Apline",
      "LiveWire",
      "Tailwind",
      "MySQL",
      "Stripe",
      "Still under construction!",
    ],
    github: "https://github.com/MariusArmory/webshop",
  },
};
</script>
<template>
<div class="snap-y snap-mandatory">
  <PageSection background="bg-background" class="mx-4 sm:mx-44">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 items-center content-center">
      <img src="/img/timothy-marias.jpg" alt="Hero" class="w-64 h-64 sm:w-96 sm:h-96 object-cover rounded-full" />
      <GreetingsText>
        Hi, my name's Tim and I'm a full-stack web developer in love with Laravel and Vue. 
        Check out my <BodyLink :href="'https://github.com/timothyjamesmarias'">Github</BodyLink> or my projects below!
      </GreetingsText>
    </div>
  </PageSection>
  <PageSection v-for="(project, key, index) in projectInfo" :key="key" :id="key" :background="index % 2 === 0 ? 'bg-secondary' : 'bg-background'">
    <ProjectContainer :src="project.src" :listcolor="index" :name="project.name" :businesslink="project.businesslink" :description="project.description" :href="project.href" :list="project.list" :github="project.github" />
  </PageSection>
</div>
</template>
