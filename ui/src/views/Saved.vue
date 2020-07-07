<template>
  <div class="container">
    <h1 class="text-center">Saved Data</h1>
    <ul id="saved-list" class="list-group list-group-flush">
          <li class="list-group-item" v-for="item in savedList">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{item.condition}}</h5>
                <p>{{item.clothes}}</p>
                <small>{{item.date}}</small>
                <p class="font-weight-bold">{{item.zip}}</p>
              </div>
            </div>
          </li>
       </ul>
  </div>
</template>


<script>

  export default {
    created() {
      this.getData()
    },
    data() {
      return {
        savedList:[]
      }
    },
    methods: {
      getData() {
        const data = fetch(`http://localhost:5000/getSavedData`)
        .then(res => res.json())
        .then(json => {
          this.savedList = json
        })
      }
    }
  }


</script>


<style>
</style>