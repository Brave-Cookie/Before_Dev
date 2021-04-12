<template>

    <p>chk_db.vue</p>
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
       a : {}
     }
  },

  methods: {
        test() {
          this.axios.get('http://localhost:3000/api/chk_DB').then(
        (res) => { this.a = res.data }
        )}
  }
   
  
}
</script>

<style>
</style>
