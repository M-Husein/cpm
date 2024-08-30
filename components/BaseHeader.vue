<script lang="ts" setup>
import { Button } from 'ant-design-vue';

const currentUser = useAuthUser();
const isAdmin = useAdmin();
const { logout } = useAuth();

const form = reactive({
  pending: false,
});

async function onLogoutClick() {
  try {
    form.pending = true;

    await logout();
    await navigateTo("/login");
  } catch (error) {
    console.error(error);
  } finally {
    form.pending = false;
  }
}
</script>

<template>
  <header class="bg-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="py-2 px-4 mx-auto w-full max-w-5xl">
      <nav class="flex items-center gap-4">
        <NuxtLink 
          to="/" 
          class="text-gray-700 font-bold text-lg no-underline" 
          translate="no"
        >
          U-Management
        </NuxtLink>

        <div class="ml-auto flex items-center gap-6">
          <template v-if="currentUser">
            <NuxtLink 
              to="/projects" 
              activeClass="underline"
              class="text-gray-700 [&:not(.underline)&:not(:hover)]_no-underline underline-offset-8"
            >
              Projects
            </NuxtLink>
            <NuxtLink 
              v-if="isAdmin" 
              to="/users" 
              activeClass="underline"
              class="text-gray-700 [&:not(.underline)&:not(:hover)]_no-underline underline-offset-8"
            >
              Users
            </NuxtLink>
            
            <Button
              :disabled="form.pending"
              @click="onLogoutClick"
            >
              Logout
            </Button>
          </template>
          <template v-else>
            <Button @click="navigateTo('/login')">Login</Button>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>
