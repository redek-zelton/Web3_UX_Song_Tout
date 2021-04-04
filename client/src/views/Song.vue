<template>
<main>
  <h1>SONG FOR A CITY</h1>
  <h3> ContractId : {{ContractId}}</h3>
  <!-- <h3>Abi : {{Abi}}</h3> -->
  <br><br>
  <div class="order">
  <button v-if="start" v-on:click="Start">start</button>
  <button v-on:click="functG1">Name + Total Token</button>
  <div v-if="Switch1">
    <h3>name : {{G1.name}}</h3>
    <h3>total : {{G1.Total}}</h3>
  </div>
  <button v-on:click="functG2">Metadata URI 0</button>
  <div v-if="Switch2">
    <h3>name : {{G2.name}}</h3>
    <h3>total : {{G2.description}}</h3>
    <h3>image</h3>
    <img :alt="JsonUrl" :src="G2.image" width="40%" height="40%">
    <p><a href="http://www.victoire-oberkampf.fr/NFT-Workshop/SongForACity.jpeg" target="_blank">image</a></p>
  </div>
  <button v-on:click="functG3">Claim</button>
  <div class='tf'>
  <input type="number" v-model="transf" maxlength="10" placeholder="TokenID pour transfert">
  <input type="text" v-model="tfAddress" maxlength="50" placeholder="Address pour transfert">
  <button v-on:click="Transfert">Transfert Token</button>
  </div>
  <button v-on:click="All">Display Tokens from my address</button>
  <div v-if="Switch4">
    <p>{{myTokens}}</p>
  </div>
  <button v-on:click="All">Display All Tokens</button>
  <div v-if="Switch3">
    <p>{{all}}</p>
  </div>
  </div>
  </main>
</template>

<script>
import Web3 from 'web3'
// import axios from 'axios'
export default {
  name: 'Song',
  data () {
    return {
      ContractId: '0x004a84209a0021b8ff182ffd8bb874c53f65e90e',
      Abi: '',
      myAddress: '',
      start: true,
      SongForACity: {},
      Switch1: false,
      Switch2: false,
      Switch3: false,
      Switch4: false,
      transf: 0,
      tfAddress: '',
      G1: {},
      JsonUrl: '',
      Metadonnee: { name: 'Song For A city', description: 'An audio album released in 2018. Listen here https://victoire-oberkampf.bandcamp.com/album/songs-for-a-city', image: 'www.victoire-oberkampf.fr/NFT-Workshop/SongForACity.jpeg' },
      metadata: '',
      G2: {},
      myTokens: [],
      all: []
    }
  },
  methods: {
    Start: async function () {
      const web3 = new Web3(window.ethereum)
      const account = await web3.eth.getAccounts()
      this.myAddress = account[0]
      console.log(account) // address Metamask
      const SongForACity = new web3.eth.Contract(this.Abi, this.ContractId, { from: account[0] })
      this.SongForACity = SongForACity
      this.start = false
    },
    functG1: async function () {
      const SongForACity = this.SongForACity
      // name
      const name = await SongForACity.methods.name().call()
      // tokenCounter
      const total = await SongForACity.methods.tokenCounter().call()
      this.G1.name = name
      this.G1.Total = total
      this.Switch1 = true
      console.log(name)
      console.log(total)
    },
    functG2: async function () {
      const SongForACity = this.SongForACity
      // token URI
      const Metadonnee = await SongForACity.methods.tokenURI(0).call()
      console.log(Metadonnee)
      this.JsonUrl = Metadonnee
      /*
      fetch(Metadonnee, {
        method: 'get',
        headers: { 'Access-Control-Allow-Origin': Metadonnee }
      }).then(function (response) {
        const file = response
        console.log(file)
      })
      */
      /* Blocage d’une requête multiorigines (Cross-Origin Request)
      : la politique « Same Origin » ne permet pas de
      consulter la ressource distante située sur
      http://www.victoire-oberkampf.fr/NFT-Workshop
      /SongForACity.json. Raison : échec de la
      requête CORS. */
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      // axios.get(Metadonnee).then(response => (this.Metadonnee = response))
      // console.log(this.Metadonnee)
      this.G2.name = this.Metadonnee.name
      this.G2.description = this.Metadonnee.description
      // Blocage des images
      this.G2.image = this.Metadonnee.image
      this.Switch2 = true
    },
    functG3: async function () {
      const SongForACity = this.SongForACity
      // claimAToken (il faut regarder le console)
      const claim = await SongForACity.methods.claimAToken().send()
      console.log(claim)
    },
    // Create an interface to transfer a token
    Transfert: async function () {
      const SongForACity = this.SongForACity
      const result = await SongForACity.methods.transferFrom(this.myAddress, this.tfAddress, this.transf).send()
      console.log(result)
    },
    // Create a view to visualize all the token holders for each token
    Holders: async function () {
      const SongForACity = this.SongForACity
      const Counter2 = await SongForACity.methods.tokenCounter().call()
      for (let i = 0; i <= Counter2; i++) {
        // const addr = await SongForACity.methods.ownerOf(i).call()
        const tokenid = i
        if (await SongForACity.methods.ownerOf(i).call() === this.myAddress) {
          this.myTokens.push(SongForACity.methods.tokenByIndex(tokenid))
        }
      }
      this.Switch4 = true
    },
    // Create routing + view to display all the tokens held by any address specified in the URL
    All: async function () {
      const SongForACity = this.SongForACity
      const Counter = await SongForACity.methods.tokenCounter().call()
      console.log(Counter)
      for (let i = 0; i <= Counter - 1; i++) {
        const token = await SongForACity.methods.ownerOf(i).call()
        this.all.push(token)
      }
      this.Switch3 = true
    }
  },
  mounted () {
    const request = require('../utils/constants/songContract.js')
    this.Abi = request.ABI
    // fetch('/metadata')
    //   .then(res => res.json())
    //   .then(({ metadata }) => {
    //     this.metadata = metadata
    //   })
    //   .catch(error => { this.error = error })
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    // axios.get('http://www.victoire-oberkampf.fr/NFT-Workshop/SongForACity.json').then(response => (this.metadata = response))
  }
}
</script>

<style>
.order {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  width: 50%;
  margin-bottom: 8px;
  border-radius: 5px;
}
.tf {
  border: solid black;
}
</style>
