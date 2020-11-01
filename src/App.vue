<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="text-h5">Shapey</span>

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Board/>
    </v-main>
  </v-app>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'App',

  components: {
    Board
  },

  data: () => ({
    //
  }),

  mounted(){
  }
};
</script>
