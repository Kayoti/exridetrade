<template>
      <button @click="Close" class="baseButtonWrapper   ">
                <slot></slot>
      </button>
</template>


<style scoped>
.baseButtonWrapper {
    transition: background-color 0.2s, color 0.2s;
    display: inline-block;
    background-position: center;
}
.baseButtonWrapper:active {
  box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.5);
}
</style>