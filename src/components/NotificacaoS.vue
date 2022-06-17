<template>
    <div class="corpo__notificacao">
        <div class="corpo__Cnotificacao">
            <h3 class="corpo__Ntitulo">Delete comment</h3>
            <p class="corpo__Nconteudo">
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <div class="corpo__NCbotao">
                <button class="corpo__Nbotao" @click="cancel">NO,CANCEL</button>
                <button class="corpo__Nbotao2" @click="deleteALL(id,idR)">YES,DELETE</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IComments } from '@/interfaces/IComments'
import { IReplies } from '@/interfaces/IReplies'
import { IUser } from '@/interfaces/IUser'
import { store, useStore } from '@/store'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
    name:'NotificacaoS',
    methods:{
        cancel(){
            this.$emit('aoDelete',this.deleteAtivo)
        },
        deleteALL(id : number, idR : number){
            if(idR == undefined){
                this.removerComment(id)
            }
            else{
                this.removeReply(id,idR)
            }
    },
        removerComment(id : number){
            store.dispatch('REMOVER_COMMENT',id)
            this.$emit('aoDelete',this.deleteAtivo)
        },
        removeReply(id : number, idR : number){
            const comment = this.modeloComment(this.Comment?.id || 0,
                this.Comment?.content || 'error',
                this.Comment?.createdAt || 'error',
                this.Comment?.score || 0,
                this.Comment?.user || this.User[0],
                this.Comment?.replies || [])
            const commentF = comment.replies.filter(resp => resp.id != idR)
            comment.replies = commentF
            store.dispatch('CADASTRAR_REPLY',comment)
            this.$emit('aoDelete',this.deleteAtivo)

        },
        modeloComment(id:number, conteudo:string,createdAt:string, score:number, user: IUser ,replies: IReplies[]): IComments{
        const comment = {
          id: id ,
          content: conteudo,
          createdAt:createdAt,
          score:score,
          user:user,
          replies: replies
        } as IComments
        return comment
        }
    
    },
    emits:['aoDelete'],
    data(){
        return{
            deleteAtivo: false
        }
    },
    props:{
        id: Number,
        idR: Number,
        Comment:{
        type: Object as PropType<IComments>
      },
    },
    setup(){
        const store = useStore()
        return{
            User : computed(() => store.state.Users)
        }
    }
    
        
    
})
</script>

<style lang="scss">
    .corpo{
        &__notificacao{
            z-index: 5;
            transition: 300ms ease-in-out;
            background-color: #00000077;
            position: fixed;
            left: 0;
            width: 100vw;
            height: 100vh;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            
        }
        &__Cnotificacao{
            height: 160px;
            width: 280px;
            background-color: $White;
            padding: 2rem;
            border-radius: 0.5rem;
        }
        &__Ntitulo{
            margin-top: 0;
            @include Rubik-500;
            font-size: 1.4rem;
            color: $Darkblue;

        }
        &__Nconteudo{
            @include Rubik-400;
            color: $GrayishBlue;

        }
        &__NCbotao{
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
        &__Nbotao{
            background-color: $GrayishBlue;
            padding: 1.5rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0.4rem;
            border: none;
            color: $White;
            @include Rubik-400;
            font-size: 0.9rem;
            transition: 300ms ease-in-out;
            &:hover{
                opacity: 0.5;
                cursor: pointer;
            }

        }
        &__Nbotao2{
            background-color: $SoftRed;
            padding: 1.5rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0.4rem;
            border: none;
            color: $White;
            @include Rubik-400;
            font-size: 0.9rem;
            transition: 300ms ease-in-out;
            &:hover{
                opacity: 0.5;
                cursor: pointer;
            }


        }
    }

</style>
