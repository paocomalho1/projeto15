<template>
    <NotificacaoS v-if="this.deleteAtivo" :id="id" :idR="Reply.id" @aoDelete="deleteR" />
    <div class="corpo__mensagem reply">
    <LikeSReply :Reply="Reply"/>
    <div class="corpo__Cconteudo">
      <div class="corpo__Chead">
        <div class="corpo__Cuser">
          <img
            :src="Reply.user.image.webp"
            alt=""
            class="corpo__user"
          />
          <p class="h3 corpo__name">{{Reply.user.username}}</p>
          <p class="corpo__you" v-if="Reply.user.username == Users[0].username">you</p>
          <p class="corpo__mes">{{Reply.createdAt}}</p>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="editR" v-if="Reply.user.username == Users[0].username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteR" v-if="Reply.user.username == Users[0].username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="reply(Reply.user.username)" v-if="Reply.user.username != Users[0].username">Reply</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        <strong class="corpo__userReply">{{`@${Reply.replyingTo}`}}</strong>{{Reply.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikesSCelularReply :Reply="Reply"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="editR" v-if="Reply.user.username == Users[0].username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteR" v-if="Reply.user.username == Users[0].username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="reply(Reply.user.username)" v-if="Reply.user.username != Users[0].username">Reply</a>
    </div>
    </div>
  </div>
   <FormularioS @aoReply="edit"  v-if="replyAtivo" :username="Reply.user.username" :replyAtivo="this.replyAtivo" :idComment="id" :idReply="Reply.id"/>
   <FormularioS @aoEdit="edita"  v-if="editReplyAtivo" :editReplyAtivo="this.editReplyAtivo" :replyAtivo="this.replyAtivo" :idComment="id" :idReply="Reply.id"/>
</template>
<script lang="ts">
import { computed, defineComponent,PropType } from "vue";
import LikeSReply from "./LikesSReply.vue";
import {useStore} from "../store";
import NotificacaoS from './NotificacaoS.vue';
import FormularioS from './FormularioS.vue';
import LikesSCelularReply from './LikesSCelularReply.vue'

import { IComments } from "@/interfaces/IComments";
export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeSReply,
    FormularioS,
    NotificacaoS,
    LikesSCelularReply
  },
  emits:[
      'aoReply'
  ],
  props:{
    Reply:{
      type: Object as PropType<IComments>,
    },
    idComment:{
      type:Number
    },
    id:{
        type:Number
    }
  },
  methods: {
    reply(username: string) {
      this.replyAtivo = !this.replyAtivo;
      this.$emit('aoReply',this.replyAtivo,username)
    },
    deleteR(){
      this.deleteAtivo = !this.deleteAtivo
    },
    editR(){
      this.editReplyAtivo = !this.editReplyAtivo

    },
    edit(reply : boolean){
      this.replyAtivo = reply
    },
    edita(reply : boolean){
      this.editReplyAtivo = reply
    }
  },

  setup(){
    const store = useStore()
    store.dispatch('GET_COMMENTS')
    store.dispatch('GET_USERS')
    return{
      Comments :computed(() => store.state.Comments),
      Users: computed(() => store.state.Users)  
    }
  },
  data() {
    return {
      replyAtivo: false,
      botao: "REPLY",
      editReplyAtivo: false,
      deleteAtivo: false,
    };
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
