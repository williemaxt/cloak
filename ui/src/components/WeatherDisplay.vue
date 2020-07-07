<template>
  <div class="container">
    <!-- zip code form -->
    <div class="input-group mb-3">
      <input type="number" class="form-control" placeholder="your ZIP code" v-model="zipCode">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" v-on:click="getWeather">Search</button>
      </div>
    </div>

    <!-- columns for result lists -->
    <div class="row">
      <div class="col">
        <ul id="whether-list" class="list-group list-group-flush">
          <li class="list-group-item" v-for="item in weather">
            <h1 class="display-4">{{item.main.temp}}</h1>
            <p>Conditions: {{item.weather[0].main}}</p>
            <p>Details:{{item.weather[0].description}}</p>
            <small>{{item.dt_txt}}</small>
          </li>
       </ul>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{currentTitle}}</h5>
            <a href="#" class="card-link" v-on:click="saveList()">Save List</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherDisplay',
  props: {
    msg: String
  },
  data() {
    return {
      weather:[],
      zipCode:'',
      currentDesc:'',
      currentTitle:'',
      finalConditions:''
    }
  },
  methods: {
    getWeather() {
      const data = fetch(`http://localhost:5000/getWeather/${this.zipCode}`)
      .then(res => res.json())
    .then(json => {
      this.weather = json
      // analyze weather data to ge the clothes 
      this.calculateClothes(this.weather)
    });

    },
    calculateClothes(data) {
      // putting main criteria into arrays
      let temperatures = []
      let conditions = []
      let tripItems = []
      
      // formula for unique array values
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      

      data.forEach(item => {
        temperatures.push(parseInt(item.main.temp))
        conditions.push(item.weather[0].main)
      })

       // getting minimum value in an array
      Array.min = function( array ){
          return Math.min.apply( Math, array );
      };

      // setting the minimum temperature of the day
      let minTemp = Array.min(temperatures)

      // getting the unique conditions
      conditions = conditions.filter(unique)
      
      // loop through conditions
      conditions.forEach(item => {

        // adding to the 
        switch(item) {
            case 'Clouds':
              if (minTemp < 60) {
                tripItems.push('long sleves t-shirt')
                tripItems.push('long pants')
              } else {
                tripItems.push('short sleves t-shirt')
                tripItems.push('short pants')
              }
            break;
            case 'Rain':
              tripItems.push('umbrella')
              if (minTemp < 60) {
                tripItems.push('long sleves t-shirt')
                tripItems.push('long pants')
              } else {
                tripItems.push('short sleves t-shirt')
                tripItems.push('short pants')
              }
            break;
            case 'Clear':
              if (minTemp < 60) {
                tripItems.push('long sleves t-shirt')
                tripItems.push('long pants')
              } else {
                tripItems.push('short sleves t-shirt')
                tripItems.push('short pants')
              }
            break;
            case 'Snow':
              if (minTemp < 60) {
                tripItems.push('long sleves t-shirt')
                tripItems.push('long pants')
                tripItems.push('Jacket')
              } else {
                tripItems.push('short sleves t-shirt')
                tripItems.push('short pants')
              }
            break;
            case 'Extreme':
              if (minTemp < 60) {
                tripItems.push('Jacket')
                tripItems.push('Tent')
                tripItems.push('long sleves t-shirt')
                tripItems.push('long pants')
              } else {
                tripItems.push('Tent')
                tripItems.push('short sleves t-shirt')
                tripItems.push('short pants')
              }
            break;
          default:
            // code block
        }

        // getting unique items from the trip items array
        this.currentDesc = tripItems.filter(unique)
        
      })
      
      this.currentTitle =  `Based on ${conditions.join()} and according to the temperatures ... you should pack: ${this.currentDesc}`
      this.finalConditions = conditions.join()
      
    },
    saveList() {
      const data = {
        condition: this.finalConditions,
        clothes: this.currentTitle,
        zip: this.zipCode
      }

      fetch(`http://localhost:5000/saveWeather`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(this.$router.push({path:'/saved'}))
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.col {
  margin-top:5vh;
}
#whether-list{
  height: 60vh;
  overflow-y: scroll;
}
</style>
