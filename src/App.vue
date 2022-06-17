<template>  
  <body>
    <main class="corpo">
    <ConteinerS />
    </main>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ConteinerS from './components/ConteinerS.vue'

export default defineComponent({
  name: 'App',
  components: {
    ConteinerS,
  }
});
</script>

<style lang="scss">
  body{
    background-color: $Lightgray;
  }
  .corpo{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex-flow: column-reverse;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
