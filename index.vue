<template>
  <el-card>
    <div style="margin-bottom: 16px; display: flex; align-items: center;">
      <el-input
        v-model="search"
        placeholder="请输入用户名"
        style="width: 200px; margin-right: 12px;"
        @keyup.enter="fetchUsers"
        clearable
      />
      <el-button type="primary" @click="fetchUsers">查询</el-button>
      <el-button type="success" @click="openAddDialog" style="margin-left: auto;">新增用户</el-button>
    </div>
    <el-table :data="users" border style="width: 100%;">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 16px;"
      @current-change="fetchUsers"
      @size-change="fetchUsers"
    />

    <!-- 用户新增/编辑弹窗 -->
    <UserDialogForm
      :visible="dialogVisible"
      :title="dialogTitle"
      :user="currentUser"
      :rules="rules"
      @save="saveUser"
      @cancel="dialogVisible = false"
      @update:visible="dialogVisible = $event"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import UserDialogForm from './components/UserDialogForm.vue'

const users = ref<any[]>([])
const total = ref(0)
const pageNo = ref(1)
const pageSize = ref(10)
const search = ref('')

const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const currentUser = ref<any>(null)
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 模拟后端数据
let userId = 1000
const mockDB = ref([
  { id: 1, username: 'admin', nickname: '管理员', role: 'admin' },
  { id: 2, username: 'user1', nickname: '用户一', role: 'user' }
])

function fetchUsers() {
  // 实际开发请替换为接口请求
  let data = mockDB.value.filter(u =>
    !search.value || u.username.includes(search.value)
  )
  total.value = data.length
  users.value = data.slice((pageNo.value - 1) * pageSize.value, pageNo.value * pageSize.value)
}

function openAddDialog() {
  dialogTitle.value = '新增用户'
  currentUser.value = null
  dialogVisible.value = true
}

function openEditDialog(row: any) {
  dialogTitle.value = '编辑用户'
  currentUser.value = { ...row }
  dialogVisible.value = true
}

function saveUser(user: any) {
  if (user.id) {
    // 编辑
    const idx = mockDB.value.findIndex(u => u.id === user.id)
    if (idx > -1) {
      mockDB.value[idx] = { ...user }
      delete mockDB.value[idx].password
      ElMessage.success('修改成功')
    }
  } else {
    // 新增
    mockDB.value.push({
      id: ++userId,
      username: user.username,
      nickname: user.nickname,
      role: user.role
    })
    ElMessage.success('新增成功')
  }
  fetchUsers()
}

function deleteUser(row: any) {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', { type: 'warning' })
    .then(() => {
      mockDB.value = mockDB.value.filter(u => u.id !== row.id)
      ElMessage.success('删除成功')
      fetchUsers()
    })
}

onMounted(fetchUsers)
</script>
