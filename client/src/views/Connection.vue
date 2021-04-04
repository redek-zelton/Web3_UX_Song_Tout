<template>
<main>
  <h1>Connection avec Metamask</h1>
  <div id="demo">
        <vue-metamask
            userMessage="msg"
            @onComplete="onComplete"
        >
        </vue-metamask>
    </div>
    <div>
      <p>CONNECTION : {{connection}} ({{typeofrun}})</p>
      <p>ADDRESS : {{metaMaskAddress}}</p>
      <p>NETWORK (CHAIN ID) : {{type}}({{netID}})</p>
      <p>LAST BLOCK : {{lastBlock}}</p>
    </div>
    </main>
</template>
<script>
import VueMetamask from 'vue-metamask'
import Web3 from 'web3'
// import Web3 from 'web3'
export default {
  components: {
    VueMetamask
  },
  data () {
    return {
      type: '',
      metaMaskAddress: '',
      netID: '',
      connection: '',
      typeofrun: '',
      lastBlock: ''
    }
  },
  methods: {
    onComplete (data) {
      console.log('data:', data)
      // window.web3 = Web3(window.ethereum)
      this.type = data.type
      this.metaMaskAddress = data.metaMaskAddress
      this.netID = data.netID
      this.connection = 'Done'
      if (typeof window.ethereum !== 'undefined') {
        this.typeofrun = 'MetaMask'
      }
      var web3 = new Web3(window.ethereum)
      web3.eth.getBlockNumber().then(data => { this.lastBlock = data })
    }
  }
}
</script>
