<template>
  <div class="home">
    <h1>Home</h1>
    <HelloMetamask/>
  </div>
</template>

<script>
import HelloMetamask from '@/components/HelloMetamask'
export default {
  name: 'Home',
  components: {
    HelloMetamask
  },
  beforeCreate () {
    console.log('registerWeb3 Action dispatched')
    this.$store.dispatch('registerWeb3')
  }
}
</script>
