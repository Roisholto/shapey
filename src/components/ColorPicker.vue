<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="value"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-color-picker v-model="local_value" @input="$emit('input', $event)"/>
      </v-card>
    </v-menu>
</template>

<script>
export default {
  props:{
    value:{
      type:String,
    }
  },

  mounted(){
    // default local_value to value
    if(this.value)
      this.local_value = this.value ;
  },

  data(){
    return {
      local_value:'',
      menu:false
    }
  }
}
</script>
