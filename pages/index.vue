<template>
        <GreetingsText class="pt-10">
        Hey, my name's Tim and I'm a full stack web dev. 
        I like building things on the internet.
        </GreetingsText>
        <div class="grid lg:md:sm:grid-cols-2 xs:grid-cols-1 pt-20 gap-4">
            <NuxtLink to="/projects"> 
            <InfoContainer class="flex justify-between align-center">
                <h2 class="text-ubuntu text-white text-3xl px-2 py-1
                group-hover:text-blue">
                My Projects
                </h2>
                <font-awesome-icon :icon="['fas', 'wrench']"
                class="text-white text-3xl group-hover:text-blue px-2 py-2"
                />
            </InfoContainer>
            </NuxtLink>

            <NuxtLink to="/posts"> 
            <InfoContainer class="flex justify-between align-center">
                <h2 class="text-ubuntu text-white text-3xl px-2 py-1
                group-hover:text-blue">
                My Blog
                </h2>
                <font-awesome-icon :icon="['fas', 'book']"
                class="text-white text-3xl group-hover:text-blue px-2 py-2"
                />
            </InfoContainer>
            </NuxtLink>
        </div>
</template>
