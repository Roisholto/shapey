<template lang="html">
  <div style="height:100%">
    <div class="shape-panel d-flex align-center pb-3">

      <v-text-field
        solo
        label="Radius"
        style="max-width:70px"
        class=""
        dense
        hide-details
        type="number"
        v-model.number="radius"
        />
      <div class="ml-2">
        <span class="text-muted caption">px</span>
      </div>

      <v-spacer />

      <div class="mr-2">
        <span class="body-2">Stroke : </span>
        <ColorPicker v-model="data.stroke"/>
      </div>

      <v-text-field
        v-model="data.name"
        solo dense
        label="Name"
        style="max-width:130px"
        hide-details
        class="mr-2"
        />

      <SaveShape :value="save_data"/>
    </div>

    <div class="my-2"></div>

    <div class="shape-board" ref="shapeBoard">
      <svg width="100%" ref="shape" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="50%"
          cy="50%"
          :r="radius"
          :stroke="data.stroke"
          fill="transparent"
          :stroke-width="stroke_width"/>
      </svg>
    </div>
  </div>
</template>

<script>
import ColorPicker from '../ColorPicker.vue' ;
import SaveShape from '../SaveShape.vue' ;

export default {
  name:"ICircle",

  props:{
    value:{
      type:Object,
      required: true
    }
  },

  data(){
    return {
      max_r:30,
      stroke_width:2,
      data:{
        r:20,
        fill:'#000',
        stroke:'#000',
        name:'circle1',
      }
    }
  },

  computed:{
    save_data(){
      let a = {
        name:this.data.name,
        shape:'circle',
        data:this.data
      }

      return a ;
    },

    radius:{
      set(x){
        this.data.r = x > this.max_r ? this.max_r : x ;
      },

      get(){
        return this.data.r
      }
    },
  },

  watch:{
    value(v){
      this.data = Object.assign(this.data, v) ;
    }
  },

  components:{
    ColorPicker,
    SaveShape
  },

  mounted(){
    let vm = this ;
    this.data = Object.assign(this.data, this.value) ;
    const resizeObserver = new ResizeObserver(entries => {
      let r ;

      for (const entry of entries) {
        r = (entry.contentRect.height > entry.contentRect.width)
            ?
            entry.contentRect.width
            :
            entry.contentRect.height;

        vm.max_r = (r/2) - 10 - vm.stroke_width;
      }
    });

  resizeObserver.observe(this.$refs.shapeBoard);
  this.resizeObserver = resizeObserver ;
  },

  methods:{

  },

  beforeDestroy(){
    this.resizeObserver.unobserve(this.$refs.shapeBoard);
    this.resizeObserver = null ;
  }
}
</script>
