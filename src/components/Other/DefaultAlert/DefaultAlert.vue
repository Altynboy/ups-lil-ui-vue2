<template>
  <BaseTransition>
    <div
      tabindex="-1"
      @keydown.esc="hideSlot()"
      class="ealert-container"
      v-show="useStore ? this.$store.getters.isClicked : isClicked"
    >
      <div
        class="ealert-container__popup"
        v-bind:style="borderColor()"
        :class="{ wide: useStore ? $store.getters.height : wide }"
      >
        <div class="first">
          <IconBase :customClass="'alert-icon'" :iconName="alertIcon()" />
          <span>
            {{ useStore ? $store.getters.defAlert.text : alertText }}
          </span>
        </div>
        <div class="close" @click="hideSlot()">
          <IconBase :customClass="'close-icon'" iconName="close-x" />
        </div>
      </div>
    </div>
  </BaseTransition>
</template>

<script>
import BaseTransition from "../Transition/BaseTransition.vue";
import IconBase from "../../Base/IconBase/IconBase.vue";

export default {
  components: { BaseTransition, IconBase },

  props: {
    "alert-type": {
      type: String,
      default: "info",
    },
    useStore: {
      type: Boolean,
      default: true,
    },
    "color-info": {
      type: String,
      default: "#2585EE",
    },
    "color-warning": {
      type: String,
      default: "#FFCF40",
    },
    "color-error": {
      type: String,
      default: "#F2363B",
    },
    "color-success": {
      type: String,
      default: "#22C993",
    },
    isClicked: {
      type: Boolean,
      default: false,
    },
    "alert-text": {
      type: String,
      default: "This is an alert",
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      alertIcon: () => {
        const alertCase = this.useStore
          ? this.$store.getters.defAlert.type
          : this.alertType;
        switch (alertCase) {
          case "error":
            return "red-alert";
          case "warning":
            return "yellow-alert";
          case "success":
            return "green-alert";
          case "info":
            return "blue-alert";
        }
      },
    };
  },

  methods: {
    borderColor() {
      var color = null;
      switch (this.alert) {
        case "error":
          color = this.colorError;
          break;
        case "warning":
          color = this.colorWarning;
          break;
        case "success":
          color = this.colorSuccess;
          break;
        case "info":
          color = this.colorInfo;
          break;
      }

      var result = "border-left:" + "5px solid" + color;

      return result;
    },
    hideSlot() {
      if (this.useStore) {
        if (this.$store.getters.height) {
          this.$store.commit("clickAlertWide", false);
        } else {
          this.$store.commit("clickAlert", false);
        }
      } else {
        this.$emit("update:is-clicked", false);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.ealert-container
  width: 100%
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)

  position: fixed
  top: 0
  left: 0
  z-index: 9998

  display: flex
  justify-content: center
  align-items: center

  &__popup
    width: 520px
    height: 80px
    background: #FFFFFF
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
    padding: 25px

    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .close
      cursor: pointer
      justify-self: flex-end
      &:hover
        svg
          fill: black

    .first
      display: flex
      flex-direction: row


      > .alert-icon
          margin-right: 20px

      > h3
          color: #666666
          font-size: 25px
          line-height: 29px

  &__getfile
    color: var(--clr-main)
    display: flex
    flex-direction: row
    align-items: flex-end
    justify-content: flex-start
    margin-left: 77px

    span
      padding: 0 0 4px 7px
      text-decoration: underline
      cursor: pointer
      font-size: 20px
      line-height: 23px

.wide
  height: 100px !important
  span
    margin-right: 10px

@media screen and ( max-width: 600px)
  .ealert-container
    &__popup
      padding: 12px
      width: 98%
      .first
        > .alert-icon
          margin-right: 10px
</style>
