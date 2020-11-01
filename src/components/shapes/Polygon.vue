<template lang="html">
  <div style="height:100%">
    <div class="shape-panel d-flex align-center">

      <div class="text-muted caption">
        Using your mouse, select grid points to draw polygon
      </div>

      <v-divider vertical class="mx-2"/>
      <div class="text-muted caption">
        Click <kbd>Enter</kbd> to stop drawing
      </div>

      <v-spacer />

      <div>
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
    <div class="py-3"></div>

    <div class="shape-board" ref="shapeBoard">
      <div id="drawing"></div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '../ColorPicker.vue' ;
import 'svg.js/dist/svg.js' ;
import 'svg.draw.js/dist/svg.draw.js' ;
import SaveShape from '../SaveShape.vue' ;

export default {
  name:"IPolygon",

  props:{
    value:{
      type:Object,
      required:true
    }
  },

  data(){
    return {
      data:{
        stroke:'#000',
        name:'polygon1',
        polygon:'',
      },
      fill:'#000',
      max_l:30,
      max_b:40,
      polygon:null
    }
  },

  computed:{
    save_data(){
      return {
        name:this.data.name,
        shape:'polygon',
        data:this.data
      }
    },

    length:{
      set(x){
        this.l = x > this.max_l ? this.max_l : x ;
      },

      get(){
        return this.l
      }
    },

    breadth:{
      set(x){
        this.b = x > this.max_b ? this.max_b : x ;
      },

      get(){
        return this.b
      }
    }
  },

  watch:{
    "data.stroke"(n){
      this.polygon.stroke({color:n});
      this.data.polygon = this.polygon.svg() ;
    },

    value(x){
      this.valueChanged() ;
    }
  },

  components:{
    ColorPicker,
    SaveShape
  },

  mounted(){
    // Since only pre-created polygons have values ;
    this.data = Object.assign(this.data, this.value) ;

    let vm = this ;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        vm.max_l = entry.contentRect.height - 10;
        vm.max_b = entry.contentRect.width - 10;
      }
    });

  resizeObserver.observe(this.$refs.shapeBoard);
  this.resizeObserver = resizeObserver ;

  let polygon = this.polygon =  new SVG('drawing').size('100%', '100%')
            .polygon()
            .draw({snapToGrid:20})
            .fill({color:'transparent'})
            .stroke({color:this.data.stroke});

  if(Object.keys(this.value).length){
    polygon.svg(this.value.polygon) ;
    polygon.attr({points:this.value.polygonPoints}) ;
  }

  function drawEnd(e){
    if(e.keyCode == 13){
        polygon.draw('done');
        polygon.off('drawstart');
        vm.data.polygon = polygon.svg() ;
        vm.data.polygonPoints = polygon.attr('points') ;
    }
  }

  polygon.on('drawstart', function(e){
      document.addEventListener('keydown', drawEnd);
  });

  polygon.on('drawstop', function(e){
    document.removeEventListener('key', drawEnd)
  });



  },

  methods:{
    valueChanged(){
      this.polygon.svg(this.value.polygon) ;
      this.polygon.attr({points:this.value.polygonPoints}) ;
    }
  },

  beforeDestroy(){
    this.resizeObserver.unobserve(this.$refs.shapeBoard);
    this.resizeObserver = null ;
  }
}
</script>
<style lang="scss" scoped>
.shape-board{
  background:url('../../assets/grid.png') #fff;
  border-radius:10px;
}

</style>
