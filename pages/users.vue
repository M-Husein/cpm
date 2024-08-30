<script lang="ts" setup>
import type { User } from "~/types";
import type { TableProps } from 'ant-design-vue';
import { Table, Button, Modal, notification } from 'ant-design-vue';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue';

definePageMeta({
  middleware: ["admin-only"],
});

const [modalApi, modalContextHolder] = Modal.useModal();
const [notifApi, notifContextHolder] = notification.useNotification();

const { data: users } = await useAsyncData<User[]>("users", () =>
  $fetch("/api/users", { headers: useRequestHeaders(["cookie"]) as HeadersInit }),
);

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
      :title="() => h('h1', { class: 'text-lg m-0' }, ['Users'])"
      :dataSource="users || []" 
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
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
      </template>
    </Table>

    <ClientOnly fallback-tag="i" fallback="Loading">
      <modalContextHolder />
      <notifContextHolder />
    </ClientOnly>
  </NuxtErrorBoundary>
</template>
