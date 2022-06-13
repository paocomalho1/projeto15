<template>
    <div class="corpo__notificacao">
        <div class="corpo__Cnotificacao">
            <h3 class="corpo__Ntitulo">Delete comment</h3>
            <p class="corpo__Nconteudo">
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <div class="corpo__NCbotao">
                <button class="corpo__Nbotao" @click="cancel">NO,CANCEL</button>
                <button class="corpo__Nbotao2" @click="deleteC(id,idR)">YES,DELETE</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { store, useStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    name:'NotificacaoS',
    methods:{
        cancel(){
            this.$emit('aoDelete',this.deleteAtivo)
        },
        deleteC(id : number, idR : number){
            console.log('lol')
            if(idR == undefined){
                store.commit('REMOVE_COMMENT',id)
                this.$emit('aoDelete',this.deleteAtivo)
            }
            else{
                const ids: number[] = [id,idR]
                store.commit('REMOVE_REPLY',ids)
                this.$emit('aoDelete',this.deleteAtivo)
            }
    },
    },
    emits:['aoDelete'],
    data(){
        return{
            deleteAtivo: false
        }
    },
    props:{
        id: Number,
        idR: Number
    },
    setup(){
        const store = useStore()
    }
    
        
    
})
</script>

<style lang="scss">
    .corpo{
        &__notificacao{
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
