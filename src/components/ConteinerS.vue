<template>
<section class="corpo__Cmensagem">
  <router-view></router-view>
</section>
</template>

<script lang='ts'>
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
//import FormularioS from './FormularioS.vue'
//import CommentS from './CommentS.vue'
export default defineComponent({
  name: "MensagemS",
  components: {
    //CommentS,
    //FormularioS
  },
  setup(props){
    const store = useStore()
    const Comments = computed(() => store.state.Comments)
    const router = useRouter()
    let Users = computed(() => store.state.Users[0])

    const mudarUser = (id: number) : void =>{
      router.push(`/users/${id}`)
    }

    //store.dispatch('GET_COMMENTS')
    return{
      Comments,
      Users,
      mudarUser,

    }
}
});
</script>

<style lang='scss'>
.corpo {
  @include celular{
  }
  &__Cmensagem{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin-right: 25%;
    margin-left: 25%;
    @include celular{
      margin-right: 0%;
      margin-left: 5%;
    }
  }
  &__mensagem {
    width: calc(100% - 1.25rem);
    background-color: $White;
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    margin-top: 1rem;
  }

  &__Clikes {
    margin-right: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background-color: $Lightgray;
    border-radius: 0.5rem;
    padding-top: 0rem;
    padding-bottom: 0.1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100px;
  }

  &__numero {
    text-align: center;
    @include Rubik-700;
    color: $Moderateblue;
  }
  &__icone {
    align-self: center;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
  }
  &__plus {
    width: 11px;
    height: 11px;
    background: url(../images/icon-plus.svg);
    transition: 300ms ease-in-out;
    &:hover {
      cursor: pointer;
      background: url(../images/icon-plus-violet.svg);
    }
  }
  &__minus {
    width: 11px;
    height: 11px;
    background: url(../images/icon-minus.svg) no-repeat center;
    transition: 300ms ease-in-out;
    &:hover {
      cursor: pointer;
      background: url(../images/icon-minus-violet.svg) no-repeat center;
    }
  }
  &__Cconteudo{
    width: 100%;
  }
  &__conteudo {
    display: flex;
    flex-direction: column;
    word-break: break-all
  }
  &__Chead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__Cuser {
    display: flex;
  }
  &__user {
    align-self: center;
    width: 32px;
    height: 32px;
    margin-right: 1rem;
  }
  &__name {
    align-self: center;
    margin-right: 1rem;
    @include Rubik-500;
  }
  &__mes {
    align-self: center;
    margin-right: 1rem;
    @include Rubik-400;
  }
  &__Cbotaolink{
    @include celular{
      
    }
  }
  &__botaoLink {
    display: block;
    align-self: center;
    @include Rubik-500;
    text-decoration: none;
    color: $Moderateblue;
    transition: 300ms ease-in-out;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
  &__conteudo {
    @include Rubik-400;
    color: $GrayishBlue;
    font-size: 0.9rem;
    line-height: 1.35rem;
  }
  &__Creply{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  &__Cbotaolink{
    width: 30%;
    display: flex;
    justify-content: flex-end;
    @include celular{
      display: none;
    }
  }
  &__CbotaolinkC{
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }

}
.deletelink{
  color:$SoftRed;
  margin-left: 1rem;
  &:hover{
    cursor: not-allowed;
  }
  &::before {
      content: url(../images/icon-delete.svg);
      margin-right: 0.5rem;
    }
}
.editlink{
  &::before {
      content: url(../images/icon-edit.svg);
      margin-right: 0.5rem;
    }
}
.replylink{
  margin-left: 1rem;
  &::before {
      content: url(../images/icon-reply.svg);
      margin-right: 0.5rem;
    }
}
</style>