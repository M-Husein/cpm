<script lang="ts" setup>
import type { Project } from "~/types";
import type { TableProps } from 'ant-design-vue';
import { Table, Button } from 'ant-design-vue';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';

definePageMeta({
  middleware: ["admin-only", "user-only"],
});

const { data: projects } = await useAsyncData<Project[]>("projects", () =>
  $fetch("/api/projects", { headers: useRequestHeaders(["cookie"]) as HeadersInit }),
);

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(date))
}

const columns: TableProps["columns"] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 145,
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
    :title="() => h('h1', { class: 'text-lg m-0' }, ['Projects'])"
    :dataSource="projects || []" 
    :columns="columns"
  >
    <template #bodyCell="{ column, text }">
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
      <template v-if="column.dataIndex === 'startDate'">
        <time>{{ formatDate(text) }}</time>
      </template>
    </template>
  </Table>
</template>
