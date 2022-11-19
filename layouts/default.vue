<template>
    <PageHeader />
    <NavBar />
    <div class="xl:lg:md:sm:mx-20 xs:mx-10 ">
        <slot />
    </div>
    <br />
</template>

<style global>
*::selection {
    background: #9bb8dc; 
}

html,
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
body {
    background-color: #16171E;
}
::-webkit-scrollbar {
    display: none;
}
</style>
