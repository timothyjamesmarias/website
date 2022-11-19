<script setup lang="ts">

</script>
<template>
    <ContentList path="/posts" v-slot="{ list }">
      <div v-for="article in list" :key="article._path" >
        <div class="py-3">
            <NuxtLink :to="article._path">
               <div class="text-white font-ubuntu ">
                  <h2 class="text-xl hover:text-blue">{{ article.title }}</h2> 
                  <p>{{ article.description }}</p>
                  <ContentLine />
               </div> 
            </NuxtLink>
        </div> 
      </div>
    </ContentList>
</template>
