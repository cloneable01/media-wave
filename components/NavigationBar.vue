<template>
  <nav class="navbar w-full">
    <div
      class="flex justify-between container mx-auto py-2 z-[900]"
      style="z-index: 900"
    >
      <div class="flex">
        <div class="">
          <router-link to="#">
            <div class="hover:bg-gray-100 rounded p-2">
              <img src="~/assets/logo-icon.png" alt="Logo" class="w-12 p-1" />
            </div>
          </router-link>
        </div>
        <div class="block md:flex my-auto">
          <div class="hidden md:flex md:text-sm md:font-bold w-fit my-auto">
            World Health Organisation
          </div>
          <div class="md:hidden">WHO</div>
          <div class="md:border-l md:border-gray-400 md:ml-4">
            <p class="md:ml-4 font-bold md:font-normal">Data</p>
          </div>
        </div>
      </div>
      <div class="navbar-menu text-right h-fit my-auto">
        <div class="hidden md:grid grid-cols-3 gap-x-1w">
          <router-link to="#" class="h-fit col-span-1 mx-auto"
            >WHO Global</router-link
          >
          <router-link to="#" class="h-fit col-span-1 mx-auto"
            >Language</router-link
          >
          <router-link to="#" class="h-fit col-span-1 mx-auto"
            >Show navigation</router-link
          >
        </div>
        <div class="md:hidden">
          <router-link
            to="#"
            class="h-fit mx-auto block w-8 hover:bg-gray-100 rounded p-2"
          >
            <div class="border border-black"></div>
            <div class="border border-black my-1"></div>
            <div class="border border-black"></div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style scoped>
.navItem {
  background-color: black;
}
</style>
