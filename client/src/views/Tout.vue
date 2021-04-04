<template>
<main>
  <h1>TOUT DOUCEMENT</h1>
  <h3> ContractId : {{ContractId}}</h3>
  <!-- <h3>Abi : {{Abi}}</h3> -->
  <br><br>
  <div class="order">
  <button v-if='start' v-on:click="Start">start</button>
  <div class='tf'>
   <input type="number" v-model="value" placeholder="Value">
   <button v-on:click="Buy">Buy A Token</button>
  </div>
  <button v-on:click="Holders">Display Tokens from address</button>
  <div v-if="Switch1">
  </div>
  <button v-on:click="All">Display All Tokens</button>
  <div v-if="Switch2">
    <p>{{all}}</p>
  </div>
  </div>
  </main>
</template>

<script>
import Web3 from 'web3'
export default {
  name: 'Tout',
  data () {
    return {
      ContractId: '0x89150a0325ecc830a2304a44de98551051b4f466',
      Abi: '',
      myAddress: '',
      ToutDoucement: {},
      start: true,
      all: [],
      Switch1: false,
      Switch2: false,
      value: 0
    }
  },
  methods: {
    Start: async function () {
      const web3 = new Web3(window.ethereum)
      const account = await web3.eth.getAccounts()
      this.myAddress = account
      console.log(account) // address Metamask
      const ToutDoucement = new web3.eth.Contract(this.Abi, this.ContractId, { from: account[0] })
      this.ToutDoucement = ToutDoucement
      this.start = false
    },
    Buy: async function () {
      const ToutDoucement = this.ToutDoucement
      // BuyAToken
      const Counter = await ToutDoucement.methods.tokenCounter().call()
      console.log(Counter)
      const Buy = await ToutDoucement.methods.buyAToken(this.value).send()
      console.log(Buy)
    },
    // Create a view to visualize all the token holders for each token
    Holders: async function () {
      const ToutDoucement = this.ToutDoucement
      const token = await ToutDoucement.methods.tokenOfOwnerByIndex(this.myAddress, 0).call()
      console.log(token)
      this.Switch1 = true
    },
    // Create routing + view to display all the tokens held by any address specified in the URL
    All: async function () {
      const ToutDoucement = this.ToutDoucement
      const Counter = await ToutDoucement.methods.tokenCounter().call()
      console.log(Counter)
      for (let i = 0; i <= Counter - 1; i++) {
        const token = await ToutDoucement.methods.tokenURI(i).call()
        this.all.push(token)
      }
      this.Switch2 = true
    }
  },
  mounted () {
    const request = require('../utils/constants/toutContract.js')
    this.Abi = request.ABI
  }
}
</script>

<style>
  .tf {
  border: solid black;
}
</style>
