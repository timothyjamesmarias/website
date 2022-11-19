<script setup lang="ts">

</script>
<template>
    <ProseH1>
    Posts
    </ProseH1>
    <ContentList path="/posts" v-slot="{ list }">
      <div v-for="article in list" :key="article._path" >
        <div class="py-3">
            <NuxtLink :to="article._path">
               <div class="group text-white font-ubuntu border border-magenta rounded-lg hover:border-yellow">
                  <h2 class="text-3xl group-hover:text-blue py-1 px-2">{{ article.title }}</h2> 
                  <p class="py-1 px-2">{{ article.description }}</p>
               </div> 
            </NuxtLink>
        </div> 
      </div>
    </ContentList>
</template>
