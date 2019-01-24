<template>
  <div id="app">
    <div class="panel" :style="{'background-color':app_background_color}">
      <div class="panel-center" :style="{'background-color':search_background_color}">
        <!-- 顶部搜索栏 -->
        <div class="search">
          <div class="search-title">
            <div></div>
            <div class="title">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :background-color="search_background_color"
                text-color="#2c2727"
                :active-text-color="app_background_color"
                @select="handleSelect"
              >
                <el-menu-item index="1">谷歌</el-menu-item>
                <el-menu-item index="2">百度</el-menu-item>
                <el-menu-item index="3">必应</el-menu-item>
                <el-menu-item index="4">图片</el-menu-item>
                <el-menu-item index="5">百科</el-menu-item>
              </el-menu>
            </div>
            <div>
              <el-button icon="el-icon-setting" circle @click="openSetting"></el-button>
            </div>
          </div>
          <div class="search-input">
            <el-input
              v-model="input1"
              class="input-with-select"
              :placeholder="searchContent"
              clearable
              @keyup.enter.native="search"
            >
              <el-button slot="append" type="info" v-on:click="search">搜索</el-button>
            </el-input>
          </div>
        </div>
        <!-- 导航网站 -->
        <div class="website" :style="{'background-color':search_background_color}">
          <div class="website-content">
            <div v-for="website in websites" :key="website.id" style="width:100%;padding:15px;">
              <el-card class="website-content-card">
                <div slot="header" class="website-content-header">
                  <span>{{website.title}}</span>
                </div>
                <div class="website-content-card-page">
                  <div v-for="page in website.pages" :key="page.name" style="padding:5px;">
                    <div @contextmenu.prevent="editWebsite(page.name)">
                      <el-popover
                        placement="top"
                        width="160"
                        v-model="page.visible"
                        trigger="manual"
                      >
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="page.visible = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="page.visible = false">确定</el-button>
                        </div>
                        <el-button slot="reference" plain @click="goWebsite(page.url)">{{page.name}}</el-button>
                        <!-- <el-button slot="reference">删除</el-button> -->
                      </el-popover>
                      <!-- <el-button plain @click="goWebsite(page.url)">{{page.name}}</el-button> -->
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 设置 -->
    <div class="setting" v-if="settingShow">
      <div class="mask"></div>
      <div class="setting-content" :style="{'background-color':search_background_color}">
        <div class="setting-content-header">
          <el-button icon="el-icon-close" circle @click="closeSetting"></el-button>
        </div>
        <div class="setting-content-body">
          <div class="setting-content-body-website">
            <h3>添加导航网站</h3>
            <div class="setting-form">
              <span>网站分组：</span>
              <el-select
                v-model="settingSelectWebsiteGroup"
                clearable
                filterable
                placeholder="请选择网站分组"
                style="width:50%;"
              >
                <el-option
                  v-for="website in websites"
                  :key="website.id"
                  :label="website.title"
                  :value="website.id"
                ></el-option>
              </el-select>
            </div>

            <div class="setting-form">
              <span>网站名称：</span>
              <el-input v-model="websiteName" placeholder="请输入网站名称" style="width:50%;"></el-input>
            </div>
            <div class="setting-form">
              <span>网站链接：</span>
              <el-input v-model="websiteUrl" placeholder="请输入网站链接" style="width:50%;"></el-input>
            </div>
            <div class="setting-form">
              <el-button type="primary" @click="addWebsite">确认</el-button>
            </div>
          </div>
        </div>
        <div class="setting-content-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$http.get("../static/data/websites.json").then(res => {
      this.websites = res.data;
    });
  },
  data() {
    return {
      app_background_color: "#dfdfdf",
      search_background_color: "#ffffff",
      input1: "",
      activeIndex: "1",
      searchContent: "Google搜索",
      url: "https://www.google.com/search?q=",
      settingShow: false,
      settingSelectWebsiteGroup: "",
      websiteName: "",
      websiteUrl: "",
      websites: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.searchContent = "Google 搜索";
        this.url = "https://www.google.com/search?q=";
      } else if (key == 2) {
        this.searchContent = "百度一下，你就知道";
        this.url = "https://www.baidu.com/s?word=";
      } else if (key == 3) {
        this.searchContent = "微软 Bing 搜索";
        this.url = "https://cn.bing.com/search?q=";
      } else if (key == 4) {
        this.searchContent = "惊人的免费图片";
        this.url = "https://pixabay.com/zh/photos/";
      } else if (key == 5) {
        this.searchContent = "Wikipedia";
        this.url = "https://zh.wikipedia.org/wiki/";
      }
    },
    search() {
      window.open(this.url + this.input1);
    },
    goWebsite(url) {
      window.open(url);
    },
    openSetting() {
      this.settingShow = true;
    },
    closeSetting() {
      this.settingShow = false;
    },
    addWebsite() {
      let websites = this.websites;
      let settingSelectWebsiteGroup = this.settingSelectWebsiteGroup;
      let website = websites.find(function(website) {
        return website.id === settingSelectWebsiteGroup;
      });
      let page = new Object();
      page.name = this.websiteName;
      page.url = this.websiteUrl;
      website.pages.push(page);
      this.$http
        .post("localhost:3000/add-website", this.websites)
        .then(function(res) {
          console.log(res);
        });
    },
    editWebsite(name) {
      let websites = this.websites;
      for (let i in websites) {
        let website = websites[i];
        let pages = website.pages;
        for (let j in pages) {
          pages[j].visible = false;
          if (pages[j].name === name) {
            pages[j].visible = true;
          }
        }
      }
      this.$http
        .post("http://127.0.0.1:3000/add-website", this.websites)
        .then(function(res) {
          console.log(res);
        });
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  overflow-x: hidden;
}
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  font-weight: 600;
}
.panel {
  width: 100%;
  position: absolute;
}
.panel-center {
  width: 80%;
  margin: auto;
  margin-top: 55px;
  margin-bottom: 35px;
}
.search {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
}
.search-title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.search-input {
  width: 35%;
  margin-top: -1px;
}
.website {
  width: 80%;
  margin: auto;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.website-content {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
}
.website-content-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.website-content-card-page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
}
.setting {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mask {
  width: 70%;
  height: 100%;
  opacity: 0.5;
  background: black;
}
.setting-content {
  width: 30%;
  height: 100%;
  padding: 20px;
  padding-top: 75px;
}
.setting-content-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.setting-content-body-website {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.setting-form {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>