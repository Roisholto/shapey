<template lang="html">
  <div style="height:100%">
    <div class="shape-panel d-flex align-center pb-3">

      <v-text-field
        solo
        label="Length"
        style="max-width:70px"
        class=""
        dense
        hide-details
        type="number"
        v-model.number="length"/>

      <div class="mx-2">x</div>
      <v-text-field
        solo
        dense
        style="max-width:70px"
        label="Breadth"
        v-model.number="breadth"
        type="number"
        min="1"
        max="100"
        class="mr-2"
        hide-details
        />

      <div>
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
        <rect
          x="2"
          y="2"
          :width="data.b"
          :height="data.l"
          :stroke="data.stroke"
          fill="transparent"
          stroke-width="2"
          />
      </svg>
    </div>
  </div>
</template>

<script>
import ColorPicker from '../ColorPicker.vue' ;
import SaveShape from '@/components/SaveShape.vue' ;

export default {
  name:"IRectangle",

  props:{
    value:{
      type:Object,
      required: true
    }
  },

  data(){
    return {
      data:{
        l:30,
        b:40,
        fill:'#000',
        stroke:'#000',
        name:'rect1',
      },
      max_l:30,
      max_b:40,
      saving:false
    }
  },

  computed:{
    save_data(){
      let a = {
        name:this.data.name,
        shape:'rectangle',
        data:this.data
      }

      return a ;
    },

    length:{
      set(x){
        this.data.l = x > this.max_l ? this.max_l : x ;
      },

      get(){
        return this.data.l
      }
    },

    breadth:{
      set(x){
        this.data.b = x > this.max_b ? this.max_b : x ;
      },

      get(){
        return this.data.b
      }
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
      let boxSize;
      for (const entry of entries) {
        vm.max_l = entry.contentRect.height - 10;
        vm.max_b = entry.contentRect.width - 10;
        /*
        if (entry.contentBoxSize[0]) {
          boxSize = entry.contentBoxSize[0].inlineSize;
        } else {
          boxSize = entry.contentBoxSize.inlineSize;
        }*/
      }
    });

  resizeObserver.observe(this.$refs.shapeBoard);
  this.resizeObserver = resizeObserver ;
  },

  methods:{
    save(){

    }
  },

  beforeDestroy(){
    this.resizeObserver.unobserve(this.$refs.shapeBoard);
    this.resizeObserver = null ;
  }
}
</script>
