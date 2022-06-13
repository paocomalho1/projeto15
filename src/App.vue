<template>  
  <body>
    <main class="corpo">
    <MensagemS />
    </main>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MensagemS from './components/MensagemS.vue'

export default defineComponent({
  name: 'App',
  components: {
    MensagemS,
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
