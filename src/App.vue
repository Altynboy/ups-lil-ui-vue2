<template>
  <div id="app">
    <VueTooltip text="This is a tooltip" />
    <CodeInput v-model="test"></CodeInput>
    <InputIIN v-model="iin"></InputIIN>
    <DefaultAlert
      text="This is an alert"
      alert-type="warning"
      :use-store="false"
      :is-clicked="isClicked"
      @update:is-clicked="isClicked = false"
    />
    <IconBase iconName="close-x"></IconBase>
    <button @click="isClicked = true">Show alert</button>
  </div>
</template>

<script>
import VueTooltip from "./components/Base/VueTooltip/VueTooltip.vue";
import CodeInput from "./components/Inputs/CodeInput/CodeInput.vue";
import InputIIN from "./components/Inputs/InputIIN/InputIIN.vue";
import DefaultAlert from "./components/Other/DefaultAlert/DefaultAlert.vue";
import IconBase from "./components/Base/IconBase/IconBase.vue";

export default {
  name: "App",

  components: {
    VueTooltip,
    CodeInput,
    InputIIN,
    DefaultAlert,
    IconBase,
  },

  data() {
    return {
      test: "123456",
      iin: "123456789012",
      isClicked: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  height: 100vh;
}
</style>
