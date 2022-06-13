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
          quantidadeLikes: this.Reply?.score,
          quantidadeControle: this.Reply?.score,
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
    Reply:{
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
.corpo{
  &__Clikes{
    @include celular{
      display: none !important;
    }
  }
 }
</style>