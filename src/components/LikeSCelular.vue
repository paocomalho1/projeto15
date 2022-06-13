<template>
  <div class="corpo__Clikes">
    <i class="corpo__icone corpo__plus" :class="{'ativoP': ativoP }" @click="add"></i>
    <p class="corpo__numero">{{quantidadeLikes}}</p>
    <i class="corpo__icone corpo__minus" :class="{'ativoM': ativoM }" @click="remove"></i>
  </div>
</template>

<script lang="ts">
import { IComments } from "@/interfaces/IComments";
import { defineComponent, PropType } from "vue";


export default defineComponent({
  name: "LikeS",
  data(){
      return{
          quantidadeLikes: this.Comment?.score,
          quantidadeControle: this.Comment?.score,
      }
  },
  computed:{
    ativoP() : boolean{
      if(this.quantidadeControle != undefined){
        if(this.quantidadeLikes == this.quantidadeControle+1){
          return true
      }else{
          return false
      }
      }
      return false
    },
    ativoM() : boolean{
      if(this.quantidadeControle != undefined){
        if(this.quantidadeLikes == this.quantidadeControle-1){
          return true
      }else{
          return false
      }
      }
      return false
    }
  },
  props:{
    Comment:{
      type: Object as PropType<IComments>,

    }
  },
  methods:{
      add(){
          if(this.quantidadeLikes === undefined){
            this.quantidadeLikes = 0
          }
          else if(this.quantidadeControle != undefined){
            if(this.quantidadeControle == this.quantidadeLikes -1){
              return
            }
          }
          this.quantidadeLikes += 1
      },
      remove(){
        if(this.quantidadeLikes === undefined){
          this.quantidadeLikes = 0
          }else if(this.quantidadeLikes === 0){
              return
          }else if(this.quantidadeControle != undefined){
            if(this.quantidadeControle == this.quantidadeLikes +1){
              return
            } 
          }
          this.quantidadeLikes -= 1
      }
      
  }
});
</script>

<style lang="scss" scoped>
 .ativoP{
    background: url(../images/icon-plus-violet.svg) !important;
 }
 .ativoM{
    background: url(../images/icon-minus-violet.svg) no-repeat center !important;
 }
 .corpo{
  &__Clikes{
    display: none;
    @include celular{
        display: flex;
      height: 50px;
      align-items: center;
      flex-direction: row;
      padding-bottom: 0rem;
    }
    }
    &__numero{
        @include celular{
        margin-right: 1rem;
        margin-left: 1rem;
        }
    
  }
 }
</style>