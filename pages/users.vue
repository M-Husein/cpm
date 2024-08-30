<script lang="ts" setup>
import type { User } from "~/types";
import type { TableProps } from 'ant-design-vue';
import { Table, Button } from 'ant-design-vue';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';

definePageMeta({
  middleware: ["admin-only"],
});

const { data: users } = await useAsyncData<User[]>("users", () =>
  $fetch("/api/users", { headers: useRequestHeaders(["cookie"]) as HeadersInit }),
);

// const currentUser = useAuthUser();

const columns: TableProps["columns"] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
  },
  {
    title: '',
    dataIndex: 'x',
    key: 'x',
    align: 'center',
    width: 75,
  },
];
</script>

<template>
  <Table
    bordered
    rowKey="id"
    size="small"
    :title="() => h('h1', { class: 'text-lg m-0' }, ['Users'])"
    :dataSource="users || []" 
    :columns="columns"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.dataIndex === 'x'">
        <Button
          ghost
          size="small"
          type="primary"
          :icon="h(EyeOutlined)"
          title="Show"
          class="mr-1"
        />
        
        <Button
          danger
          ghost
          size="small"
          type="primary"
          :icon="h(DeleteOutlined)"
          title="Delete"
        />
      </template>
    </template>
  </Table>
</template>
