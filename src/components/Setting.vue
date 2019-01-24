<template>
  <div class="settings">
    <div class="settings-website">
      <el-button icon="el-icon-plus" circle @click="closeSetting"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  methods: {
    closeSetting() {
      this.settingShow = false;
    }
  }
};
</script>


<style>
.settings {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
.website-settings {
  width: 100%;
  height: 100%;
  background: black;
}
</style>

