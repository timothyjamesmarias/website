<script setup lang="ts">
const config = useRuntimeConfig();
import "mailgun-js";

const from: string = ref("");
const subject: string = ref("");
const message: string = ref("");
const processing: boolean = ref(false);
const API_KEY = 'YOUR_API_KEY';
const DOMAIN = 'YOUR_DOMAIN_NAME';


const messageData = {
  from: from.value,
  to: config.mailgun_to,
  subject: subject.value,
  text: message.value,
};

const sendMail = async () => {
  processing.value = true;
  try {
    await client.messages.create(config.mailgun_domain, messageData);
    from.value = "";
    subject.value = "";
    message.value = "";
    processing.value = false;
  } catch (error) {
    console.log(error);
    processing.value = false;
  }
};

onMounted(() => {
  const mailgun = new MailGun({
    apiKey: config.mailgun_api_key,
    domain: config.mailgun_domain,
  });
    const client = mailgun.client({
        username: 'api',
        key: config.mailgun_key
    });
});
watchEffect(() => {
  console.log(from.value);
  console.log(subject.value);
  console.log(message.value);
});
</script>
<template>
<FormContainer>
<h2 class="text-3xl font-bold text-center text-green mt-3">Contact</h2>
<form method="POST" @submit.prevent="submit">
  <InputLabel :value="'Your Email'" class="mt-4"/>
  <TextInput :type="'email'" :placeholder="'someone@gmail.com'" :name="'email'" v-model="from" class="mt-1"/>
  <InputLabel :value="'Subject'" class="mt-4"/>
  <TextInput :type="'text'" :placeholder="'Subject'" :name="'subject'" v-model="subject" class="mt-1"/>
  <InputLabel :value="'Message'" class="mt-4"/>
  <TextAreaInput :placeholder="'Message'" :name="'message'" v-model="message" class="mt-1"/>
  <SubmitButton :value="'Send'" class="mt-4 float-right" :disabled="processing"/>
</form>
</FormContainer>
</template>
