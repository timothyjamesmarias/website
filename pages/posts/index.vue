<template>
<div>
    <ProseH1>
    Posts
    </ProseH1>
    <ContentList path="/posts" v-slot="{ list }">
      <div v-for="article in list.reverse()" :key="article._path" >
        <div class="py-3">
            <NuxtLink :to="article._path">
               <InfoContainer>
                  <h2 class="text-3xl group-hover:text-blue py-1 px-2">{{ article.title }}</h2> 
                  <p class="py-1 px-2">{{ article.description }}</p>
               </InfoContainer>
            </NuxtLink>
        </div> 
      </div>
    </ContentList>
</div>
</template>
