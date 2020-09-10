<template>
  <el-container class="home">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" class="logout-button" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ? '64px':'230px'">
        <div class="collapse-button" @click="collapse"><span>| | |</span></div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" 
        unique-opened :collapse="iscollapse" :collapse-transition="false" router 
        :default-active="activePath">
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item :index="'/'+sub.path+''" v-for="sub in item.children" :key="sub.key" 
                @click="saveNavState('/'+sub.path)">
              
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{sub.authName}}</span>
                </template>

              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import getNavData from "../api/home/getNavData";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menulist: [],
      //侧边栏图标对象
      iconObj:{
        '125':'el-icon-user',
        '103':'el-icon-house',
        '101':'el-icon-s-shop',
        '102':'el-icon-tickets',
        '145':'el-icon-s-data',
      },
      //侧边栏是否收缩
      iscollapse:false,
      activePath:'',
    };
  },
  methods: {
    //退出登录
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //导航栏收缩
    collapse(){
      this.iscollapse = !this.iscollapse
    },
    //保存导航栏激活状态
    saveNavState(activePath){
      // console.log('1')
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },

  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
    // console.log(this.activePath)
    getNavData().then((res) => {
      this.menulist = res.data.data;
      // console.log(res.data.data);
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    .logo {
      color: azure;
      display: flex;
      align-items: center;
      font-size: 20px;
      img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: azure;
        margin-right: 30px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    height: 100%;
    // width: 50px;
    color: azure;
    .collapse-button{
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      span:hover{
      cursor: pointer;
    }
    }
    
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
