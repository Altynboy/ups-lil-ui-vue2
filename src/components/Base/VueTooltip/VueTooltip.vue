<template>
  <div class="tooltip">
    <IconBase iconName="yellow-alert" />
    <span class="tooltiptext">{{ text }}</span>
  </div>
</template>

<script>
import Icon from "../IconBase/IconBase.vue";

export default {
  props: {
    img: {
      default: "alert",
    },
    text: {
      required: true,
    },
    title: {
      required: false,
    },
  },

  components: {
    IconBase: Icon,
  },

  methods: {
    getImage() {
      return "";
    },
  },
};
</script>

<style lang="sass" scoped>
.tooltip:hover
  .tooltiptext
    visibility: visible

.tooltip
  position: relative
  display: inline-block
  cursor: help
  padding-right: 5px

.tooltip .tooltiptext
  visibility: hidden
  width: 120px
  background-color: black
  color: #fff
  text-align: center
  border-radius: 6px
  padding: 5px 0

  /* Position the tooltip */
  position: absolute
  z-index: 1
  top: -7px
  left: 105%
  font-size: 12px
</style>
