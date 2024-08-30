<script lang="ts" setup>
import { Layout, Menu, Button } from 'ant-design-vue';

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
  <Layout.Header 
    class="w-full bg-slate-200 sticky top-0 z-50 shadow-sm"
  >
    <nav class="max-w-5xl mx-auto">
      <Menu
        theme="light"
        mode="horizontal"
        class="bg-transparent flex items-center"
      >
        <Menu.Item key="logo" class="!mr-auto">
          <NuxtLink
            to="/" 
            class="text-gray-700 font-bold text-lg no-underline" 
            translate="no"
          >
            U-Management
          </NuxtLink>
        </Menu.Item>

        <template v-if="currentUser">
          <Menu.Item key="1">
            <NuxtLink 
              to="/projects" 
              class="text-gray-700 no-underline"
            >
              Projects
            </NuxtLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NuxtLink 
              v-if="isAdmin" 
              to="/users" 
              class="text-gray-700 no-underline"
            >
              Users
            </NuxtLink>
          </Menu.Item>
          <Menu.Item key="3">
            <Button
              :disabled="form.pending"
              @click="onLogoutClick"
            >
              Logout
            </Button>
          </Menu.Item>
        </template>
        <template v-else>
          <Button @click="navigateTo('/login')">Login</Button>
        </template>
      </Menu>
    </nav>
  </Layout.Header>
</template>
