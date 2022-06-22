<template>
  <NotificacaoS v-if="this.deleteAtivo" :id="Comment.id" @aoDelete="deleteComment"/>
  <div class="corpo__mensagem">
    <LikeS :Comment="Comment"/>
    <div class="corpo__Cconteudo">
      <div class="corpo__Chead">
        <div class="corpo__Cuser">
          <img
            :src="Comment.user.image.webp"
            alt=""
            class="corpo__user"
          />
          <p class="h3 corpo__name">{{Comment.user.username}}</p>
          <p class="corpo__you" v-if="Comment.user.username == Users.username">you</p>
          <p class="corpo__mes">{{Comment.createdAt}}</p>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Comment.user.username == Users.username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteComment" v-if="Comment.user.username == Users.username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Comment.user.username != Users.username">Reply</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        {{Comment.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikeS :Comment="Comment" :celular="celular"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Comment.user.username == Users.username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteComment" v-if="Comment.user.username == Users.username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Comment.user.username != Users.username">Reply</a>
    </div>
    </div>
  </div>
  <ReplyS v-for="Reply in Comment.replies" :key="Reply.id" :Reply="Reply" :Comment="Comment" :User="Users"/>
  <FormularioS @aoReply="mudarReply" v-if="this.replyAtivo" :replyAtivo="this.replyAtivo" :username="Comment.user.username" :Comment="Comment" :Users="Users"/>
  <FormularioS @aoEdit="mudarEdit" v-if="this.editAtivo" :editAtivo="this.editAtivo" :username="this.username" :Comment="Comment" :Users="Users"/>
</template>
<script lang='ts'>

import { computed, defineComponent,PropType, ref } from "vue";
import LikeS from "./LikesS.vue";
import {useStore} from "../store"
import FormularioS from './FormularioS.vue'
import { IComments } from "@/interfaces/IComments";
import ReplyS from './ReplyS.vue'
import NotificacaoS from './NotificacaoS.vue'
import { IUser } from "@/interfaces/IUser";

export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeS,
    FormularioS,
    ReplyS,
    NotificacaoS,
  },
  props:{
    Comment:{
      type: Object as PropType<IComments>,
    },
    User:{
      type: Object as PropType<IUser>,
    }
  },
  setup(props){
    const store = useStore()
    //store.dispatch('GET_COMMENTS')
    const Users = ref(props.User)
    const replyAtivo = ref(false)
    const editAtivo = ref(false)
    const deleteAtivo = ref(false)
    const botao = ref("REPLY")
    const celular = ref(true)

    const mudarReply = () :void => {
      replyAtivo.value = !replyAtivo.value;
    }
    const deleteComment = () :void => {
      deleteAtivo.value = !deleteAtivo.value;
    }
    const mudarEdit = () :void => {
      editAtivo.value = !editAtivo.value;
    }
    return{
      Users,
      replyAtivo,
      editAtivo,
      deleteAtivo,
      botao,
      celular,
      mudarReply,
      deleteComment,
      mudarEdit


    }
  },
});
</script>

<style lang="scss">

.corpo{
  &__Ccelular{
    display: none;
    @include celular{
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }
  }
}

</style>
