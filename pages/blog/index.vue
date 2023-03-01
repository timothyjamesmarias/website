<template>
  <div class="mx-10 sm:mx-28 md:mx-44 lg:mx-96 my-10 rounded-lg">
    <h1 class="text-3xl text-primary">All Posts</h1>
    <ContentList path="/blog">
      <template v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path">
            <PostContainer :title="article.title" :date="article.date" :description="article.description" />
          </NuxtLink>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </div>
</template>
