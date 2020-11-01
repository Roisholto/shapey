<template lang="html">
  <div style="height:100%">
    <div class="shape-panel d-flex align-center pb-3">

      <v-text-field
        solo
        label="base"
        style="max-width:120px"
        class=""
        dense
        hide-details
        type="number"
        max="1"
        min="0"
        step="0.1"
        v-model.number="base_input"
        >
        <template v-slot:append>
          <span class="body-2">Base</span>
        </template>
      </v-text-field>

      <div class="mx-2"></div>

      <v-text-field
        solo
        label="Height"
        style="max-width:120px"
        class=""
        dense
        hide-details
        type="number"
        max="1"
        min="0"
        step="0.1"
        v-model.number="height_input"
        >
        <template v-slot:append>
          <span class="body-2">Height</span>
        </template>
      </v-text-field>

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

    <div class="shape-board mx-auto" :style="dimension_style" ref="shapeBoard">
      <svg ref="shape" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <polygon
          :points="points"
          fill="transparent"
          :stroke="data.stroke"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import ColorPicker from '../ColorPicker.vue' ;
import SaveShape from '../SaveShape.vue' ;

export default {
  name:"ITriangle",

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
      width:100,
      height:100,
      // Calculate to the current shapeBoard
      data:{
        fill:'#000',
        stroke:'#000',
        base_:1,
        height_:1,
        name:'triangle-1'
      }
    }
  },

  computed:{
    save_data(){
      return {
        name:this.data.name,
        shape:'triangle',
        data:this.data
      }
    },

    dimension_style(){
      return {
        width:100*this.data.base_.toString()+'%',
        height:100*this.data.height_.toString()+'%'
      }
    },

    base_input:{
      set(x){
        this.data.base_ = (x > 1 || x<0.1) ? this.data.base_ : x ;
      },

      get(){
        return this.data.base_
      }
    },

    height_input:{
      set(x){
        this.data.height_ = (x > 1 || x<0.1) ? this.data.height_ : x ;
      },

      get(){
        return this.data.height_
      }
    },

    points(){
      let t = []
      // start from center
      let t1 = [this.width/2, 0 ]
      let t2 = [t1[0]/2, this.height]
      let t3 = [t1[0]+t2[0], this.height] ;
      t.push(t1.join(' ')) ;
      t.push(t2.join(' '))
      t.push(t3.join(' '))
      return t.join();
    }
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
    this.data = Object.assign(this.data, this.value) ;
    let vm = this ;
    const resizeObserver = new ResizeObserver(entries => {
      let r ;

      for (const entry of entries) {
        // ('entry', entry) ;
        vm.height = entry.contentRect.height - 10;
        vm.width = entry.contentRect.width - 10;
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
