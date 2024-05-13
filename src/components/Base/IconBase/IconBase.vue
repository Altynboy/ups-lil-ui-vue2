<template>
  <svg :class="['icon', customClass]" aria-hidden="true">
    <use :xlink:href="`#icon-${iconName}`"></use>
  </svg>
</template>

<script>
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("@/assets/icons", false, /\.svg$/);
requireAll(req);

export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.icon {
  width: 20px;
  height: 20px;
  /* fill: currentColor; */
  fill: black;
}
</style>
