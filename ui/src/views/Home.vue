<template>
  <div class="container">
    <h1 class="text-center">Enter ZIP code</h1>
    <WeatherDisplay/>
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherDisplay from '@/components/WeatherDisplay.vue'

export default {
  name: 'Home',
  components: {
    WeatherDisplay
  }
}
</script>
