<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="AddRoleDialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand" label="#">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 二级和三级 -->
              <el-col :span="19">
                <!-- 通过for循环 渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6 ">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                    >{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >{{ item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(scope.row.id)">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="AddRoleDialogVisible" width="40%">
      <el-form
        :model="addRoleForm"
        ref="addRoleFormRef"
        :rules="addRoleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-tree
        :data="rightsList"
        :props="treeProps"
        ref="treeRef"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleDialogVisible" width="40%" >
      <el-form
        :model="editRoleForm"
        ref="editRoleFormRef"
        :rules="editRoleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getRolesList from "../../api/power/getRolesList";
import addRolesData from "../../api/power/addRolesData";
import getRolesTree from "../../api/power/getRolesTree";
import postRolesData from "../../api/power/postRolesData";
import editRolesData from "../../api/power/editRolesData";
import deleteRolesData from "../../api/power/deleteRolesData";
export default {
  name: "Roles",
  data() {
    return {
      rolesList: [],
      //控制添加角色对话框显示
      AddRoleDialogVisible: false,
      // 添加角色表单
      addRoleForm: {},
      //   添加角色表单验证
      addRoleFormRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },

      //控制添加用户权限对话框显示
      setRightDialogVisible: false,
      rightsList: [],
      //  树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
      defKeys: [],
      roleId: "",

      //控制编辑角色对话框显示
      editRoleDialogVisible:false,
      //编辑角色表单
      editRoleForm:{},
      //编辑角色的验证规则
      editRoleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
    };
  },
  created() {
    this.getRolesData();
  },
  methods: {
    //获取角色信息
    getRolesData() {
      getRolesList().then((res) => {
        // console.log(res);
        this.rolesList = res.data.data;
      });
    },
    //添加角色
    addRoles() {
      this.$refs.addRoleFormRef.validate((valid) => {
        if (!valid) return;
        addRolesData(this.addRoleForm).then((res) => {
          if (res.data.meta.status !== 201) {
            this.$message.error("添加角色失败！");
          }
          this.$message.success("添加角色成功！");
          this.AddRoleDialogVisible = false;
          this.getRolesData();
        });
      });
    },
    // 通过递归 获取角色下三级权限的 id, 并保存到defKeys数组
    getLeafkeys(node, arr) {
      // 没有children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafkeys(item, arr));
    },
    //分配权限
    showSetRightDialog(role) {
      this.roleId = role.id;
      // console.log(role);
      getRolesTree().then((res) => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("获取权限数据失败！");
        }
        this.rightsList = res.data.data;
        //   递归获取三级节点的id
        this.getLeafkeys(role, this.defKeys);
        // console.log(res)
      });
      this.setRightDialogVisible = true;
      // console.log(role);
    },
    allotRights() {
      // console.log(roleId)
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      postRolesData(this.roleId, idStr).then((res) => {
        if (res.data.meta.status != 200)
          return this.$message.error("分配权限失败！");
        this.$message.success("分配权限成功!");
        this.getRolesData();
        this.setRightDialogVisible = false;
        // console.log(res)
      });
      // console.log(this.$refs.treeRef)

      // console.log(keys)
    },

    //编辑角色
    editDialog(id){
      // console.log(id)
       getRolesList(id).then((res) => {
        // console.log(res);
        this.editRoleForm = res.data.data;
        console.log(this.editRoleForm.roleId)
      });
      this.editRoleDialogVisible = true
    },
    //确定编辑角色
    editRoles(){
      this.$refs.editRoleFormRef.validate((valid) => {
        if (!valid) return;
        console.log(this.editRoleForm.roleId)
        editRolesData(this.editRoleForm.roleId,this.editRoleForm).then((res) => {
          console.log(res)
          if (res.data.meta.status !== 200) {
            this.$message.error("编辑角色失败！");
          }
          this.$message.success("编辑角色成功！");
          this.AddRoleDialogVisible = false;
          this.getRolesData();
        });
      });
      this.editRoleDialogVisible = false
    } ,

    //删除角色
    deleteDialog(id){
      this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteRolesData(id).then(res=>{
          console.log(res)
          if(res.data.meta.status !==200){
            return this.$message.error('删除角色失败！')
          }
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          });
          this.getRolesData()
        }) 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>