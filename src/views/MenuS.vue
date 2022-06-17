<template>
  <div class="cabecalho">
    <img src="../images/avatars/image-juliusomo.png" class="cabecalho__img" alt="" @click="mudarUser(0)">
    <img src="../images/avatars/image-amyrobson.png" class="cabecalho__img" alt="" @click="mudarUser(1)">
    <img src="../images/avatars/image-maxblagun.png" class="cabecalho__img" alt="" @click="mudarUser(2)">
    <img src="../images/avatars/image-ramsesmiron.png" class="cabecalho__img" alt="" @click="mudarUser(3)">
  </div>
</template>

<script lang='ts'>
import { defineComponent} from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MensagemS",
  components: {
  },
  setup(){

    const router = useRouter()

    const mudarUser = (id: number) : void =>{
      router.push(`/users/${id}`)
    }
    return{
      mudarUser,

    }
}
});
</script>
<style lang="scss">
.cabecalho{
  background-color: #00000077;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  right: 0%;
  top: 0;
  align-items: center;
  justify-content: space-around;
  &__img{
    transition: 300ms ease-in-out;
    height: 50px;
    &:hover{
      cursor: pointer;
      transform: scale(2);

    }
  }
}
</style>
