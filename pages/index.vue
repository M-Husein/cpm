<script lang="ts" setup>
import { Result } from 'ant-design-vue';
import { SmileTwoTone } from '@ant-design/icons-vue';

const currentUser = useAuthUser();

const title = currentUser.value?.name ? "Hi, " + currentUser.value.name : "Welcome to U-Management";
</script>

<template>
  <Result 
    :title="title"
  >
    <template #icon>
      <SmileTwoTone />
    </template>
  </Result>
</template>
