<template>
  <div style="height: 50vh; width: 50vw">
    <LMap ref="map" :zoom="zoom" :center="[47.21322, -1.559482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
    </LMap>
  </div>
</template>

<script setup>
import { ref } from "vue";
const zoom = ref(6);
</script>

<style>
body {
  margin: 0;
}
</style>
