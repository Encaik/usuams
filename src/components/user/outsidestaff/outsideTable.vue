<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="data"
      :loading="loading"
      :pagination="pagination"
      :rowSelection="rowSelection"
      @change="handleTableChange"
    >
      <div slot="time" slot-scope="text">
        <span v-if="text">{{
          moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")
        }}</span>
        <span v-else-if="!text">暂无记录</span>
      </div>
      <div slot="type" slot-scope="text">
        <a-tag v-show="text == 1" color="red">超级管理员</a-tag>
        <a-tag v-show="text == 2" color="orange">指导老师</a-tag>
        <a-tag v-show="text == 3" color="green">主席团</a-tag>
        <a-tag v-show="text == 4" color="cyan">部长团</a-tag>
        <a-tag v-show="text == 5" color="blue">干事</a-tag>
        <a-tag v-show="text == 6" color="purple">会外人员</a-tag>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-popconfirm title="同意加入部门?" @confirm="agree(text)">
          <a @click="showAgree()">同意</a>
        </a-popconfirm>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="拒绝加入部门?" @confirm="refuse(text)">
          <a @click="showRefuse()">拒绝</a>
        </a-popconfirm>
        <a-divider type="vertical"></a-divider>
        <a @click="editGuest(record)">编辑</a>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确定要删除?" @confirm="deleteGuest(text)">
          <a @click="showDelete()">删除</a>
        </a-popconfirm>
      </div>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "学号",
    dataIndex: "number",
    align: "center"
  },
  {
    title: "性别",
    dataIndex: "sex",
    align: "center"
  },
  {
    title: "学院",
    dataIndex: "collage",
    align: "center"
  },
  {
    title: "专业",
    dataIndex: "major",
    align: "center"
  },
  {
    title: "年级",
    dataIndex: "grade",
    align: "center"
  },
  {
    title: "班级",
    dataIndex: "class",
    align: "center"
  },
  {
    title: "第一志愿",
    dataIndex: "depa1",
    align: "center"
  },
  {
    title: "第一志愿",
    dataIndex: "depa2",
    align: "center"
  },
  {
    title: "第一志愿",
    dataIndex: "depa3",
    align: "center"
  },
  {
    title: "用户权限",
    dataIndex: "user_type",
    scopedSlots: { customRender: "type" },
    align: "center"
  },
  {
    title: "申请时间",
    dataIndex: "create_date",
    scopedSlots: { customRender: "time" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "id",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          current: 1, //初始页
          pageSize: 10, //分页大小
          total: 0 //数据总数
        };
      }
    }
  },
  data() {
    return {
      columns,
      deleteVisiable: false,
      agreeVisiable: false,
      refuseVisiable: false,
      rowSelection: {
        onChange: selectedRowKeys => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
        }
      }
    };
  },
  methods: {
    handleTableChange(pagination) {
      this.$emit("change", pagination);
    },
    editGuest(data) {
      console.log("编辑");
      this.$emit("edit", data);
    },
    showDelete() {
      this.deleteVisiable = true;
    },
    deleteGuest(id) {
      this.deleteVisiable = false;
      this.$emit("delete", id);
    },
    showAgree() {
      this.agreeVisiable = true;
    },
    agree(id) {
      this.agreeVisiable = false;
      this.$emit("agree", id);
    },
    showRefuse() {
      this.refuseVisiable = true;
    },
    refuse(id) {
      this.refuseVisiable = false;
      this.$emit("refuse", id);
    }
  }
};
</script>

<style></style>
