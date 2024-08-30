<script lang="ts" setup>
import { Card, Button, Input, Checkbox } from 'ant-design-vue';

definePageMeta({
  middleware: ["guest-only"],
  layout: false,
});

const { login } = useAuth();

const form = reactive({
  data: {
    email: "admin@email.com",
    password: "password",
    rememberMe: false,
  },
  error: "",
  pending: false,
});

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;

    await login(form.data.email, form.data.password, form.data.rememberMe);
    await navigateTo("/");
  } catch (error: any) {
    if (error.data.message) form.error = error.data.message;
  } finally {
    form.pending = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center p-4">
    <main class="mx-auto max-w-sm w-full">
      <Card 
        type="inner"
        class="shadow"
      >
        <template #title>
          <h1 class="text-center text-lg m-0">Login to your account</h1>
        </template>

        <form
          @submit.prevent="onLoginClick"
        >
          <fieldset class="space-y-4" :disabled="form.pending">
            <p
              v-if="form.error"
              class="px-3 py-1.5 w-full border rounded border-red-400 text-sm text-center text-red-400"
            >
              {{ form.error }}
            </p>
            <div>
              <label for="email" class="mb-1 inline-block text-sm">Email address</label>
              <Input
                id="email"
                size="large"
                v-model:value="form.data.email"
                :disabled="form.pending"
                type="email"
                required
              />
            </div>
            <div>
              <label for="pwd" class="mb-1 inline-block text-sm">Password</label>
              <Input.Password
                id="pwd"
                size="large"
                v-model:value="form.data.password"
                :disabled="form.pending"
                spellcheck="false"
                autocomplete="off"
                autocapitalize="off"
                required
              />
            </div>

            <Checkbox
              v-model:checked="form.data.rememberMe"
              :disabled="form.pending"
            >
              Remember me
            </Checkbox>

            <Button
              :block="true"
              size="large"
              type="primary"
              htmlType="submit"
              :loading="form.pending"
            >
              Sign in
            </Button>
          </fieldset>
        </form>
      </Card>

      <p class="mt-6 text-center">
        <Button
          ghost
          type="primary"
          @click="navigateTo('/')"
        >
          Back to Home
        </Button>
      </p>
    </main>
  </div>
</template>
