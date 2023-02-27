<script setup lang="ts">
const submit = () => {

};
</script>
<template>
<FormContainer>
  <h2 class="text-3xl font-bold text-center text-success my-3">Contact - in progress</h2>
  <form method="POST" @submit.prevent="submit">
    <input type="email" name="email" placeholder="chuck@sneedsfeedandseed.farm" class="input input-bordered input-secondary w-full my-2" required/>
    <input type="text" name="email" placeholder="Topic" class="input input-bordered input-secondary w-full my-2" required/>
    <textarea name="message" placeholder="Message" class="textarea textarea-secondary w-full my-2" required></textarea>
    <button type="submit" class="btn btn-success my-2 float-right" disabled>Not ready yet</button>
  </form>
</FormContainer>
</template>
