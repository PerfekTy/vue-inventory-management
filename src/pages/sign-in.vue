<script setup>
import * as z from "zod";
import { serverString } from "../lib/utils";
import { useRouter } from "vue-router";
import { toTypedSchema } from "@vee-validate/zod";
import cookies from "vue-cookies";
import axios from "axios";
import { getToken } from "@/lib/utils";
import { onBeforeMount, ref } from "vue";

import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SignLogo from "@/components/SignLogo.vue";
import ModeToggle from "@/components/ui/mode-toggle/ModeToggle.vue";

const router = useRouter();
let error = ref(null);

onBeforeMount(() => {
  const token = getToken();
  if (token) {
    router.push("/");
  }
});

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(3).max(10),
  })
);

async function onSubmit(values) {
  try {
    const { data } = await axios.post(`${serverString}/api/sign-in`, {
      email: values.email,
      password: values.password,
    });

    if (data.token) {
      cookies.set("token", data.token);
      router.push("/");
    }
  } catch ({ response }) {
    error.value = response.data.error;
  }
}
</script>

<template>
  <Form
    :validation-schema="formSchema"
    @submit="onSubmit"
    class="flex flex-col justify-center max-w-[500px] h-screen container gap-5"
  >
    <SignLogo />

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="m@example.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-between items-center gap-5">
      <Button class="w-full" type="submit"> Sign In </Button>
      <ModeToggle />
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p class="text-sm text-muted-foreground'">
      Doesn't have an account?
      <router-link class="underline" to="/sign-up">Register</router-link>
    </p>
  </Form>
</template>
