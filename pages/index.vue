<template>
  <div class="block">
    <div class="flex py-8 w-full bg-[#001437]">
      <div class="mx-auto justify-between flex w-full container">
        <div class="text-white font-bold text-3xl">WHO COVID-19 dashboard</div>
        <div class="text-white font-bold text-lg my-auto">
          WHO Health Emergencies Programme
        </div>
      </div>
    </div>
    <div class="block w-full mx-auto bg-gray-100 p-12">
      <div class="block container mx-auto">
        <div class="block lg:grid grid-cols-2 gap-x-8">
          <div
            class="max-w-[500px] h-[500px] lg:max-w-[450px] lg:h-[400px] xl:max-w-[500px] xl:h-[500px] relative mb-4 lg:mb-0 rounded overflow-hidden shadow-md mx-auto lg:mx-0 mr-0"
          >
            <LMap ref="map" :zoom="zoom" :center="[lat, lng]">
              <LTileLayer
                :url="`https://{s}.tile.openstreetmap.org/${zoom}/{x}/{y}.png`"
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                layer-type="base"
                name="OpenStreetMap"
              />
            </LMap>
            <div class="absolute top-4 right-4 z-[1001] hidden">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white hover:text-slate-200 p-2 rounded shadow-md"
                @click="getLocation()"
              >
                Get your location
              </button>
            </div>
          </div>
          <div class="mx-auto lg:ml-auto lg:mr-0 relative w-fit">
            <div
              id="highcharts-container"
              style="height: 500px; width: 500px"
              class="w-full max-w-[500px] max-h-[500px] lg:max-w-[450px] lg:max-h-[400px] xl:max-w-[500px] xl:max-h-[500px] h-auto mx-auto rounded shadow-md ;lg:ml-auto lg:mr-0 lg:mx-0"
            />
            <div class="absolute top-4 right-4 hidden">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white hover:text-slate-200 p-2 rounded shadow-md"
                @click="getData('indonesia')"
                disabled="true"
              >
                Get Data
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="block container w-full mx-auto">
        <div
          v-if="highestNewCases !== null"
          class="rounded shadow-md bg-white p-2 w-fit ml-auto my-2"
        >
          <p>
            Highest New Cases: {{ highestNewCases }} on
            {{ highestNewCasesDate }}
          </p>
        </div>
        <div
          v-if="finalTotal !== null"
          class="rounded shadow-md bg-white p-2 w-fit ml-auto"
        >
          <p>Final Total Cases: {{ finalTotal }} on {{ finalTotalDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Highcharts from "highcharts";
import axios from "axios";

const zoom = ref(0);
const lat = ref(0.7893);
const lng = ref(113.9213);
const highestNewCases = ref(null);
const highestNewCasesDate = ref(null);
const finalTotal = ref(null);
const finalTotalDate = ref(null);

const getData = async (country) => {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/covid19`, {
      params: {
        country: country,
      },
      headers: {
        "X-API-KEY": "sHgM4iB0AcP+tyIbva88BQ==d8LBFvHHK05WjkeD",
      },
    });

    const monthlyData = parseMonthlyData(response.data);
    updateChart(monthlyData);

    let highestNew = 0;
    let highestNewDate = "";
    for (const date in response.data[0].cases) {
      const newCases = response.data[0].cases[date].new;
      if (newCases > highestNew) {
        highestNew = newCases;
        highestNewDate = date;
      }
    }
    highestNewCases.value = highestNew;
    highestNewCasesDate.value = highestNewDate;

    const lastDate = Object.keys(response.data[0].cases).pop();
    finalTotal.value = response.data[0].cases[lastDate].total;
    finalTotalDate.value = lastDate;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const parseMonthlyData = (data) => {
  const monthlyData = {};
  for (const date in data[0].cases) {
    const [year, month] = date.split("-");
    const monthKey = `${year}-${month}`;
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey] += data[0].cases[date].total;
  }
  return monthlyData;
};

const updateChart = (data) => {
  const chartData = Object.entries(data).map(([month, totalCases]) => ({
    name: month,
    y: totalCases,
  }));

  Highcharts.chart("highcharts-container", {
    chart: {
      type: "line",
    },
    title: {
      text: "Covid-24 Update",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Month",
      },
    },
    yAxis: {
      title: {
        text: "Total Cases",
      },
    },
    series: [
      {
        name: "Total Cases",
        data: chartData,
      },
    ],
    accessibility: {
      enabled: true,
    },
  });
};

const getLocation = () => {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat.value = position.coords.latitude;
        lng.value = position.coords.longitude;
        zoom.value = 18;
        $refs.map.setView([lat.value, lng.value]);
      });
    }
  } finally {
    // getCountryFromCoordinates(lat, lng);
  }
};

const getCountryFromCoordinates = async (latitude, longitude) => {
  const apiKey = "YOUR_API_KEY";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const results = data.results;
      for (const result of results) {
        for (const component of result.address_components) {
          if (component.types.includes("country")) {
            return component.long_name;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};

onMounted(() => {
  getLocation();
  getData("indonesia");
});
</script>

<style>
body {
  margin: 0;
}
</style>
