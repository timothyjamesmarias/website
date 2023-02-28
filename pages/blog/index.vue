<template>
  <div>
    <h1>Index</h1>
    <ContentList path="/blog" v-slot="{ list }" >
      <div v-for="article in list" :key="article._path">
        <NuxtLink :to="article._path"><h2>{{ article.title }}</h2></NuxtLink>
      </div>
    </ContentList>
  </div>
</template>
