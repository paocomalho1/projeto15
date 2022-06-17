<template>
    <NotificacaoS v-if="this.deleteAtivo" :id="id" :idR="Reply.id" @aoDelete="deleteReply" :Comment="Comment"/>
    <div class="corpo__mensagem reply">
    <LikeS :Reply="Reply" :Comment="Comment"/>
    <div class="corpo__Cconteudo">
      <div class="corpo__Chead">
        <div class="corpo__Cuser">
          <img
            :src="Reply.user.image.webp"
            alt=""
            class="corpo__user"
          />
          <p class="h3 corpo__name">{{Reply.user.username}}</p>
          <p class="corpo__you" v-if="Reply.user.username == Users.username">you</p>
          <p class="corpo__mes">{{Reply.createdAt}}</p>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Reply.user.username == Users.username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteReply" v-if="Reply.user.username == Users.username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Reply.user.username != Users.username">Reply</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        <strong class="corpo__userReply">{{`@${Reply.replyingTo}`}}</strong>{{Reply.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikeS :Comment="Comment" :Reply="Reply" :celular="celular"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="mudarEdit" v-if="Reply.user.username == Users.username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteReply" v-if="Reply.user.username == Users.username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="mudarReply" v-if="Reply.user.username != Users.username">Reply</a>
    </div>
    </div>
  </div>
   <FormularioS @aoReply="mudarReply"  v-if="replyAtivo" :username="Reply.user.username" :replyAtivo="this.replyAtivo" :Comment="Comment" :Reply="Reply" :Users="Users"/>
   <FormularioS @aoEdit="mudarEdit"  v-if="editReplyAtivo" :editReplyAtivo="this.editReplyAtivo" :replyAtivo="this.replyAtivo" :Comment="Comment" :Reply="Reply" :Users="Users"/>
</template>
<script lang="ts">
import { computed, defineComponent,PropType, ref } from "vue";
import LikeS from "./LikesS.vue";
import {useStore} from "../store";
import NotificacaoS from './NotificacaoS.vue';
import FormularioS from './FormularioS.vue';

import { IComments } from "@/interfaces/IComments";
import { IReplies } from "@/interfaces/IReplies";
import { IUser } from "@/interfaces/IUser";
export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeS,
    FormularioS,
    NotificacaoS,
  },
  props:{
    User:{
      type: Object as PropType<IUser>,
    },
    Reply:{
      type: Object as PropType<IReplies>,
    },
    Comment:{
       type: Object as PropType<IComments>
    },
  },

  setup(props){
    const store = useStore()
    const Users = ref(props.User)
    const replyAtivo = ref(false)
    const editReplyAtivo = ref(false)
    const deleteAtivo = ref(false)
    const botao = ref("REPLY")
    const celular = ref(true)

    const mudarReply = () :void =>  {
      replyAtivo.value = !replyAtivo.value;
    }
    const deleteReply = () :void =>  {
      deleteAtivo.value = !deleteAtivo.value;
    }
    const mudarEdit = () :void =>  {
      editReplyAtivo.value = !editReplyAtivo.value;
    }
    

    return{
      Users,
      replyAtivo,
      editReplyAtivo,
      deleteAtivo,
      botao,
      celular,
      mudarReply,
      deleteReply,
      mudarEdit

    }
  },
});
</script>

<style lang="scss">
.reply{
    width: 85% !important;
}
.corpo{

  &__userReply{
    color: $Moderateblue;
  }
  &__you{
    font-size: 12px;
    align-self: center;
    background-color: $Moderateblue;
    color: $White;
    padding-top: 0.15rem;
    padding-bottom: 0.2rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;
    border-radius: 4px;
    @include Rubik-400;
    margin-right: 1rem;
  }
}


</style>
