<template>
  <v-list dense>
    <v-list-item v-for="item in items" :key="item.name" @click="$emit('selected', item)">
      <v-list-item-avatar>
        <v-icon>{{getShapeAvatar(item.shape)}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon color="red" @click="removeItem(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  computed:{
    items(){
      return this.$store.state.history ;
    }
  },

  methods:{
    getShapeAvatar(shape){
      switch(shape)
        {
        case 'triangle':
          return 'mdi-triangle-outline'
        case 'rectangle':
          return 'mdi-rectangle-outline'
        case 'circle' :
          return 'mdi-circle-outline'
        case 'polygon' :
          return 'mdi-vector-polygon'
        default:
          return ''
        }
    },

    removeItem(x){
      this.$store.dispatch('removeHistory', x) ;
    }
  }

}
</script>
