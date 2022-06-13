<template>
  <section class="corpo__mensagem" :class="{'reply' : replyAtivo}">
    <div class="corpo__Cform">
      <img
        src="../images/avatars/image-juliusomo.png"
        alt=""
        class="corpo__img"
      />
      <textarea
        name=""
        id=""
        class="corpo__textarea"
        v-model="conteudo"
      ></textarea>
      <div class="corpo__CCform">
        <img
        src="../images/avatars/image-juliusomo.png"
        alt=""
        class="corpo__imgC"
      />
      <button class="corpo__botao" @click="getConteudo()">{{botao}}</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { IReplies } from "@/interfaces/IReplies";
import { store, useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "FormularioS",
  data(){
      return{
          conteudo: '',
          replyAtivo1: this.replyAtivo,
      }
  },
  emits:[
    "aoReply",
  ],
  computed:{
      botao() : string{
          if(this.replyAtivo){
              return 'REPLY'
          }
          else if(this.editAtivo || this.editReplyAtivo){
            return 'EDIT'
          }
          return 'SEND'
      }
  },
  setup(){
    const store = useStore()
    return{
      User: computed(() => store.state.Users),
      Comments :computed(() => store.state.Comments)
    }
  },
  props:{
      replyAtivo:{
        type:Boolean,
      } ,
      editAtivo: Boolean,
      editReplyAtivo: Boolean,
      username:{
        type:String,
        default: ''
      },
      idReply:{
        type: Number,
        default: 0
      },
      idComment:{
        type:Number
      },
      id:{
        type:Number
      },
      
      // idReply: Number,
      // idComment: Number

  },
  methods:{
      getConteudo(){
        if(this.editAtivo){
          const createdAt = new Date().toISOString().substr(11,8)
          const id = this.id
          console.log(id)
          store.commit('EDIT_COMMENT',{
            id: id,
            content: this.conteudo,
            
          } as IReplies)
          this.conteudo = ''
          return
        }else if(this.replyAtivo){
          console.log(this.idComment,this.conteudo)
          console.log(this.username)
          store.commit('ADD_REPLY',{
            id: this.idComment,
            content:this.conteudo,
            replyingTo: this.username
          } as IReplies)
          this.conteudo = ''
          this.replyAtivo1 = !this.replyAtivo
          this.$emit('aoReply',this.replyAtivo1)
          return
        }else if(this.editReplyAtivo){
          const info = [this.idComment,this.idReply,this.conteudo]
          console.log(this.idComment,this.idReply)
          store.commit('EDIT_REPLY',info)
          return
        }
          const createdAt = new Date().toISOString().substr(11,8)
          store.commit('ADD_COMMENT',this.conteudo)
          this.conteudo = ''
          // store.commit('EDIT_COMMENT',{
          //   id: this.idReply,
          //   content: this.conteudo,
          //   createdAt: createdAt,
          //   score: 0,
          //   user: store.state.Users[0]
          // } as IReplies)
      }
  }
});
</script>

<style lang="scss">
.corpo {
    &__mensagem {
    width: 85%;
    background-color: $White;
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    margin-top: 1rem;
  }
  &__Cform{
      display: flex;
      align-items: flex-start;
      width: 100%;
  }
  &__img{
      height: 50px;
      height: 50px;
  }
  &__textarea {
      border-radius: 0.5rem;
      resize: none;
      margin-right: 1rem;
      margin-left: 1rem;
      width: 100%;
      height: 100px;
      @include Rubik-400;
      color: $GrayishBlue;
      padding: 0.8rem;
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      border: $Lightgrayishblue solid 1px;
      box-sizing: border-box;
      &:focus{
         border: $Lightgrayishblue solid 2px;
         outline-style: none;
      }

  }
  &__botao {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    border: none;
    @include Rubik-400;
    color: $White;
    background-color: $Moderateblue;
    border-radius: 0.2rem;
    transition: 300ms ease-in-out;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }
}
</style>