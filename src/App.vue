<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ups&</span>
        <span class="font-weight-light">Downs</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
