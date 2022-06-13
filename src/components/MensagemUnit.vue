<template>
  <NotificacaoS v-if="this.deleteAtivo" :id="Comment.id" @aoDelete="deleteC"/>
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
          <p class="corpo__you" v-if="Comment.user.username == Users[0].username">you</p>
          <p class="corpo__mes">{{Comment.createdAt}}</p>
        </div>
        <div class="corpo__Cbotaolink">
        <a class="corpo__botaoLink editlink" @click="edit" v-if="Comment.user.username == Users[0].username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteC()" v-if="Comment.user.username == Users[0].username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="reply" v-if="Comment.user.username != Users[0].username">Reply</a>
        </div>
      </div>
      <p class="corpo__conteudo">
        {{Comment.content}}
      </p>
    </div>
    <div class="corpo__Ccelular">
    <LikeSCelular :Comment="Comment"/>
    <div class="corpo__CbotaolinkC">
        <a class="corpo__botaoLink editlink" @click="edit" v-if="Comment.user.username == Users[0].username">Edit</a>
        <a class="corpo__botaoLink deletelink" @click="deleteC()" v-if="Comment.user.username == Users[0].username">Delete</a>
        <a class="corpo__botaoLink replylink" @click="reply" v-if="Comment.user.username != Users[0].username">Reply</a>
    </div>
    </div>
  </div>
  <ReplyS @aoReply="replyUsername" v-for="Reply in Comment.replies" :key="Reply.id" :Reply="Reply" :id="Comment.id"/>
  <FormularioSReply @aoReply="editR" v-if="this.replyAtivo" :replyAtivo="this.replyAtivo" :idComment="Comment.id"/>
  <FormularioS @aoEdit="edita" v-if="this.editAtivo" :editAtivo="this.editAtivo" :id="Comment.id" :username="this.username"/>
</template>
<script lang='ts'>
//:idReply="Reply.id" :idComment="Comment.id"
import { computed, defineComponent,PropType } from "vue";
import LikeS from "./LikesS.vue";
import {store, useStore} from "../store"
import FormularioS from './FormularioS.vue'
import FormularioSReply from './FormularioSReply.vue'
import { IComments } from "@/interfaces/IComments";
import ReplyS from './ReplyS.vue'
import NotificacaoS from './NotificacaoS.vue'
import LikeSCelular from './LikeSCelular.vue'
export default defineComponent({
  name: "MensagemUnit",
  components: {
    LikeS,
    FormularioS,
    ReplyS,
    FormularioSReply,
    NotificacaoS,
    LikeSCelular
  },
  emits:[
      'aoReply',
      'aoEdit'
  ],
  props:{
    Comment:{
      type: Object as PropType<IComments>,
    },
  },
  methods: {
    replyUsername(replyAtivo :boolean, username: string){
      this.username = username
    },
    reply() {
      this.replyAtivo = !this.replyAtivo;
      this.$emit('aoReply',this.replyAtivo)
    },
    deleteC(){
      this.deleteAtivo = !this.deleteAtivo
    },
    edit() {
      this.editAtivo = !this.editAtivo;
      this.$emit('aoEdit',this.editAtivo)
    },
    editR(reply : boolean){
      this.replyAtivo = reply
    },
    edita(reply : boolean){
      this.editAtivo = reply
    }
  },
  setup(){
    const store = useStore()
    store.dispatch('GET_COMMENTS')
    return{
      Comments :computed(() => store.state.Comments)  ,
      Users: computed(() => store.state.Users)
    }
  },
  data() {
    return {
      replyAtivo: false,
      botao: "REPLY",
      editAtivo: false,
      username: "",
      deleteAtivo: false,
    };
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
