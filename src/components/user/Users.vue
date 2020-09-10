<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userlist" height="250" border style="width: 100%">
        <el-table-column type="index" width="130"></el-table-column>
        <el-table-column prop="username" label="姓名" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="role_name" label="管理权限" width="180"></el-table-column>

        <el-table-column label="状态" width="130">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button v-model="scope.row.id" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
    
<script>
import getUserData from "../../api/user/getUserData";
export default {
  name: "Users",
  data() {
    return {
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 2,
    };
  },
  methods: {
    getuser() {
      getUserData(this.queryinfo).then((res) => {
        console.log(res.data);
        if (res.data.meta.status != 200) {
          return this.$message.error("用户列表获取失败");
        }
        this.userlist = res.data.data.users;
        // this.total = res.data.data.total;
      });
    },
    //监听page-size的改变
    handleSizeChange(newsize) {
      // console.log('1')
      console.log(newsize);
      this.pagesize = newsize;
      this.getuser()
    },
    //监听页码改变的函数
    handleCurrentChange(newpage) {
      // console.log('1')
      console.log(newpage);
    },
  },
  created() {
    this.getuser()
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 1em;
}
.el-table {
  margin-top: 2em;
}
</style>