<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SignLogo from "@/components/SignLogo.vue";
import ModeToggle from "@/components/ui/mode-toggle/ModeToggle.vue";
import axios from "axios";
import { serverString } from "../lib/utils.ts";
import cookies from "vue-cookies";
import { useRouter } from "vue-router";

const router = useRouter();

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      password: z.string().min(3).max(10),
      password_confirmation: z.string(3).max(10),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["confirm"],
    })
);

async function onSubmit(values) {
  try {
    const { data } = await axios.post(`${serverString}/api/sign-up`, {
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (data.token) {
      cookies.set("token", data.token);
      router.push("/");
    }
  } catch (error) {
    console.log(error);
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
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Jane Doe" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
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
        <FormDescription>This is your email.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormDescription
          >Password sholud be at least 3 characters long.</FormDescription
        >
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password_confirmation">
      <FormItem>
        <FormLabel>Password Confirmation</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-between gap-5">
      <Button class="w-full" type="submit"> Sign Up </Button>
      <ModeToggle />
    </div>
    <p class="text-sm text-muted-foreground'">
      Already have an account?
      <router-link class="underline" to="/sign-in">Login</router-link>
    </p>
  </Form>
</template>
