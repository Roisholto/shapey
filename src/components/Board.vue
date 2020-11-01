<template lang="html">
  <div class="d-flex py-4">
    <div class="shape-selector">
      <div v-for="(shape, index) in shapes">
        <v-btn
          x-large
          icon
          @click="switch_shape(index, {})"
          :color="current_shape == index ? 'primary' : ''">
          <v-icon>
            {{shape.icon}}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider vertical class="mx-2"/>
    <div class="shape flex-fill px-2">
      <component :is="shapes[current_shape].component" :value="shape_data"/>
    </div>

    <v-menu
      offset-y
      allow-overflow
      nudge-width="200"
      max-height="500px"
      top
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          color="primary"
          fixed right bottom
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-history</v-icon>
        </v-btn>
      </template>
      <History @selected="historySelected"/>
    </v-menu>
  </div>
</template>

<script>
import IRectangle from './shapes/Rectangle.vue' ;
import ICircle from './shapes/Circle.vue' ;
import ITriangle from './shapes/Triangle.vue' ;
import IPolygon from './shapes/Polygon.vue' ;
import History from './History.vue'
import historyStorage from '@/idb.js' ;

export default {
  name:"Board",

  data(){
    return {
      shapes:{
        rectangle:{
          icon:'mdi-rectangle-outline',
          component:IRectangle
        },
        circle:{
          icon:'mdi-circle-outline',
          component:ICircle
        },
        triangle:{
          icon:'mdi-triangle-outline',
          component:ITriangle
        },
        polygon:{
          icon:'mdi-vector-polygon',
          component:IPolygon
        }
      },
      current_shape:'rectangle',
      history_menu:false,
      // default data set in props for the shape
      shape_data:{}
    }
  },

  components:{
    IRectangle,
    ICircle,
    ITriangle,
    IPolygon,
    History
  },

  mounted(){
    let vm  = this
    historyStorage.on('ready', function(){
      historyStorage.history.toCollection().toArray()
        .then(function(v){
          vm.$store.commit('setHistory', v) ;
        })
        .catch(function(e){
          console.error ("open failed due to: " + e.inner);
        })
    })

  },

  methods:{
    switch_shape(shape, val){
      this.shape_data = val ;
      this.current_shape = shape ;
    },

    historySelected(e){
      // this.
      this.switch_shape(e.shape, e.data) ;
    }
  }

}
</script>
