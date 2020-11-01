<template>
  <div class="">
    <v-btn small color="primary" rounded :loading="saving" @click="save">
      Save
      <v-icon class="ml-2">
        mdi-check
      </v-icon>
    </v-btn>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{snackbar.message}}
    </v-snackbar>
  </div>
</template>

<script>
import historyStorage from '@/idb.js' ;

export default {
  props:{
    value:{
      type:Object,
      required:true
    }
  },

  data(){
    return {
      saving:false,
      snackbar:{
        color:'',
        message:'',
        show:false
      }
    }
  },

  methods:{
    save(){
      if(!this.value.name)
        return

      this.saving = true ;
      let vm = this ;
      // TODO test the value
      let data = JSON.parse(JSON.stringify(this.value)) ;
      data.id =  `${data.name}-${data.shape}`;

      historyStorage.history.put(data)
        .then(function(i){

        })
        .catch(function(e){
          console.log('Error saving', e) ;
        })
        .finally(function(){
          vm.saving = false ;
        })
    }
  }
}
</script>
