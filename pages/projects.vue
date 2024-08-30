<script lang="ts" setup>
import type { Project } from "~/types";
import type { TableProps } from 'ant-design-vue';
import { Table, Button, Modal, notification } from 'ant-design-vue';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';

definePageMeta({
  middleware: ["admin-only", "user-only"],
});

const [modalApi, modalContextHolder] = Modal.useModal();
const [notifApi, notifContextHolder] = notification.useNotification();

const { data: projects } = await useAsyncData<Project[]>("projects", () =>
  $fetch("/api/projects", { headers: useRequestHeaders(["cookie"]) as HeadersInit }),
);

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(date))
}

const notif = (type: string, message: string) => {
  // @ts-ignore
  notifApi[type]({
    message,
    placement: 'bottomLeft',
  });
}

const deleteConfirm = (record: any) => {
  modalApi.confirm({
    keyboard: false,
    title: `Are you sure delete "${record.name}" ?`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            if(Math.random() > 0.5){
              notif('success', `Successfully deleted ${record.name}`);
              return resolve(record);
            }

            notif('error', `Failed deleted ${record.name}`);
            reject(record);
          }, 3e3);
        });
      } catch {
        return notif('error', `Failed deleted ${record.name}`);
      }
    },
  });
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
    fixed: 'right',
    width: 75,
  },
];
</script>

<template>
  <NuxtErrorBoundary>
    <Table
      bordered
      rowKey="id"
      size="small"
      :scroll="{ x: 945 }"
      :title="() => h('h1', { class: 'text-lg m-0' }, ['Projects'])"
      :dataSource="projects || []" 
      :columns="columns"
    >
      <template #bodyCell="{ column, text, record }">
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
            @click="deleteConfirm(record)"
          />
        </template>
        <template v-if="column.dataIndex === 'startDate'">
          <time>{{ formatDate(text) }}</time>
        </template>
      </template>
    </Table>

    <ClientOnly fallback-tag="i" fallback="Loading">
      <modalContextHolder />
      <notifContextHolder />
    </ClientOnly>
  </NuxtErrorBoundary>
</template>
