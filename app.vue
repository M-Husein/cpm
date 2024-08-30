<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './assets/css/tailwind.scss';
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>Construction Project Management System</Title>
      <Meta name="description" content="Construction Project Management System." />
    </Head>

    <Body class="antialiased bg-white text-gray-9">
      <ConfigProvider
        :wave="{disabled: true}"
      >
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </ConfigProvider>
    </Body>
  </Html>
</template>
