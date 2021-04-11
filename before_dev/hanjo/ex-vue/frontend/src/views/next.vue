<template>

    <p>next.vue</p>
    <br>
    <button v-on:click='test'>
        버튼
    </button>
    <br>
    {{a}}
</template>

<script>
export default {

   data() {
       return { 
           a: 1 
           }
    },

    methods: {
        test() {
          this.a += 1
        }
      }
   
}
</script>

<style>
</style>
