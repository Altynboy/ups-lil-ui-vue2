<template>
  <div :class="{ root: !column, 'root-column': column }">
    <label v-if="!!title">{{ title }}</label>
    <div class="input-container">
      <div
        class="custom-input focus"
        :class="{ warning: tooltipFlag || warningFlag }"
      >
        <span class="mobile" v-if="mobile">+</span>
        <input
          :class="{ mobile: mobile }"
          type="text"
          :value="value"
          :maxlength="max"
          @input="handleInput"
          @keypress="checkSintax($event)"
          @keydown="handleKeyDown($event)"
          @paste="onPaste($event)"
          :placeholder="placeholder"
          :autocomplete="mobile ? 'username' : 'on'"
        />
        <VueTooltip
          v-if="tooltipFlag && tooltipMsg"
          class="tooltip"
          :text="tooltipMsg"
        ></VueTooltip>
      </div>
      <span class="warning-text" v-if="tooltipFlag">{{ warn }}</span>
    </div>
  </div>
</template>

<script>
import VueTooltip from "@/components/Base/VueTooltip/VueTooltip.vue";

export default {
  components: {
    VueTooltip,
  },
  props: {
    value: {
      type: String,
      // ! Throws error `Expected String with value "null", got Null` if required
      // required: true,
      // validator: (p) => {
      //   return (
      //     ["string", "number", "boolean"].indexOf(typeof p) !== -1 || p === null
      //   );
      // },
    },
    title: {
      type: String,
    },
    max: {
      default: 30,
    },
    min: {
      default: 1,
    },
    warningMsg: {
      type: String,
    },
    tooltipMsg: {
      type: String,
    },
    rule: {
      type: String,
      default: "^[0-9А-Яа-я\\-\\s]+$",
    },
    warningFlag: {
      type: Boolean,
      default: false,
    },
    sintax: {
      type: String,
      default: "^[0-9А-Яа-я\\-\\s]$",
    },
    capitalize: Boolean,
    column: Boolean,
    decimal: Boolean,
    placeholder: {
      type: String,
      required: false,
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tooltipFlag: false,
      content: null,
      warn: this.warningMsg,
    };
  },
  methods: {
    // ! trigger with @input
    handleKeyDown(event) {
      if (event.key === "Backspace") {
        // Handle the backspace key press here
        // console.log("Backspace key pressed");
        // console.log(event.target.value);
      }
    },
    onPaste(event) {
      const value = event.clipboardData.getData("text");
      this.checkRule(value);
      if (!this.isFormatCorrect(value)) {
        event.preventDefault();
      }
    },
    isFormatCorrect(value) {
      if (!this.rule) {
        return true;
      }
      let match = new RegExp(this.rule);
      return match.test(value);
    },
    handleInput(event) {
      let value;
      let temp = event.target.value;
      if (this.mobile) {
        // console.log(typeof event.inputType);
        if (event.inputType == "deleteContentBackward") {
          if (temp[temp.length - 1] == "-") {
            value = temp.substring(0, temp.length - 1);
          } else {
            value = event.target.value;
          }
        } else if (event.inputType == "insertFromPaste") {
          let str = temp;
          if (temp[0] === "+") {
            str = temp.replace("+", "");
          }
          value = str;
        } else {
          if (
            (temp.length === 5 ||
              temp.length === 9 ||
              temp.length === 10 ||
              temp.length === 12) &&
            event.inputType === "insertText" &&
            temp[temp.length - 1] !== "-"
          ) {
            value =
              temp.substring(0, temp.length - 1) + "-" + temp[temp.length - 1];
          } else if (temp.length < 2) {
            value = event.target.value;
          } else {
            value = event.target.value;
          }
        }
      } else {
        if (this.capitalize) value = event.target.value.toUpperCase();
        else value = event.target.value;
      }
      this.$emit("input", value);
      if (value === null) {
        this.tooltipFlag = false;
        return;
      }
      if (this.min == 1) {
        this.warn = `Поле должно содержать минимум 1 символ`;
      } else {
        this.warn = `Поле должно состоять минимум из ${this.min} символов`;
      }
      if (this.min && value.length < this.min && value.length > 0) {
        this.tooltipFlag = true;
        return;
      }

      if (value.length < 1) {
        this.warn = "Заполните поле";
        this.tooltipFlag = true;
        return;
      } else this.warn = this.warningMsg;
      this.checkRule(value);
    },
    checkSintax(event) {
      const value = event.target.value;
      let char = String.fromCharCode(event.keyCode);

      if (value.length < 1 && char == " ") {
        event.preventDefault();
        return;
      }

      let match = new RegExp(this.sintax);
      if (this.decimal && char == "." && value.indexOf(".") > -1) {
        event.preventDefault();
        return;
      }

      if (this.mobile && value.length == this.max) {
        // console.log(value);
        return;
      }

      if (match.test(char) && value.length < this.max) {
        // this.$emit("input", value);
        // console.log(char);
        return;
      } else {
        event.preventDefault();
        // this.warn = `Поле может содержать только ${this.sintax} символы`;
      }
    },
    checkRule(value) {
      if (this.isFormatCorrect(value)) {
        this.tooltipFlag = false;
      } else {
        this.tooltipFlag = true;
      }
    },
  },
  watch: {
    tooltipFlag: {
      handler(newVal) {
        this.$emit("valid", !newVal);
      },
      immediate: true,
    },
    value: function () {
      if (this.value === null) {
        this.tooltipFlag = false;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.tooltip
  padding-right: 5px

input.mobile
  padding-left: 0
  font-size: 16px

span.mobile
  padding-left: 12px
  padding-right: 5px

input
  min-width: auto
  width: 350px
  height: 40px
  border: none
  padding-left: 12px
  &:focus-visible
    outline: none
    box-shadow: none
    border: 0
  &::placeholder
    font-size: 16px

.focus:focus-within
  border: 0 !important
  box-shadow: 0 0 10px var(--clr-box-shadow)
  outline: 1px solid blue

.root-column
  display: block
  width: 100%
  > label
      margin: 0
      width: 100%

.root
    margin-bottom: 10px
    display: flex
    align-items: center

.warning
    border-color: red !important
    &:focus-within
        outline: none !important
        border:1px solid red !important
        box-shadow: 0 0 10px #ce7171 !important
    &-text
        color: red


.input-container
    display: flex
    flex-direction: column
    width: 350px

div.custom-input
    display: flex
    background-color: #FFF
    border: 1px solid #CCC
    align-items: center

@media screen and ( max-width: 750px  )
    .root
      display: block

      > label
          margin: 0
          width: 100%

      input
        width: 100%

    .input-container
        width: 100%
</style>
