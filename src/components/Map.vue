<template>
  <v-img
    height="100%"
    width="100%"
    id="mapViewDiv"
  >
  </v-img>
</template>

<script>
import {appconfig} from "../assets/config.js";
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Attribution from "esri/widgets/Attribution";
import Point from "esri/geometry/Point";
import TextSymbol from "esri/symbols/TextSymbol";
import Zoom from "esri/widgets/Zoom";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
//import Sketch from "esri/widgets/Sketch";
//import CalciteMapArcGISSupport from "calcite-maps/dist/js/dojo/calcitemaps-arcgis-support-v0.10";
export default {
  props: {
    longin: String,
    textangle: String,
    punkttext: String
  },
  data() {
    return {
    mapView: null
  }},
  methods: {
    loadMap() {
            var RoadsLayer = new FeatureLayer({
              url:
                "https://services6.arcgis.com/o35AqnOAAmCIYvxP/arcgis/rest/services/roads_utm/FeatureServer/0"
            });
            var BuildingsLayer = new FeatureLayer({
              url:
                "https://services6.arcgis.com/o35AqnOAAmCIYvxP/arcgis/rest/services/buildings_utm/FeatureServer/0"
            });
            var editlayer = new GraphicsLayer();


            this.map = new Map({
              //basemap: "osm"
            });
            this.map.add(RoadsLayer);
            this.map.add(BuildingsLayer);
            this.map.add(editlayer);

            this.mapView = new MapView({
              container: "mapViewDiv",
              map: this.map,
              center: [this.longin, 48.13],
              scale: 20000,
              //zoom: 5,
              /*padding: {
                top: 50,
                bottom: 0
              },*/
              ui: { components: [] }
            });
            this.$parent.mapView = this.mapView;

            var zoom = new Zoom({
              view: this.mapView
            });
           this.mapView.ui.add(zoom, "top-left");

            var attribution = new Attribution({
              view: this.mapView
            });
            this.mapView.ui.add(attribution, "manual");


            //var sketch = new Sketch({
            //  layer: editlayer,
            //  view: this.mapView
            //});
            //this.mapView.ui.add(sketch, "top-right");

            /*this.mapView.on("click", function(event) {
              console.log("in Karte geklickt");
              this.$emit('clicked', 'someValue')
            });*/

            this.mapView.on("click", (event) => {
              console.log("in Karte geklickt");
              var laenge= event.mapPoint.longitude;
              var text = "Länge: "+laenge;
              console.log(text);
              this.$emit('clicked', text);
            });

            this.point = {
            type: "point", // autocasts as new Point()
            longitude: 11.6,
            latitude: 48.13
            };

            // Create a symbol for drawing the point
            var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [226, 119, 40],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
            }
            };

            this.textSymbol = {
              type: "text",  
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              text: this.punkttext,
              xoffset: 10,
              yoffset: 10,
              angle: this.textangle,
              font: {  // autocasts as new Font()
                size: 12,
                family: "Josefin Slab",
                weight: "bold"
              }
            };

            // Create a graphic and add the geometry and symbol to it
            var pointGraphic = new Graphic({
            geometry: this.point,
            symbol: markerSymbol
            });

            this.textGraphic = new Graphic({
            geometry: this.point,
            symbol: this.textSymbol
            });

            this.mapView.graphics.addMany([pointGraphic, this.textGraphic]);

            //Editierlayer
            //const editlayer = new GraphicsLayer();
            //this.mapView.graphics.addMany([editlayer]);



    }
  },
  watch: {
    longin: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      var pt = new Point([this.longin, 48.2]);
      this.mapView.center = pt;
      //this.textGraphic.symbol.angle=90;
      //console.log(this.textGraphic);
      //console.log(this.mapView);
      

    },
    textangle: function(newVal, oldVal) {
      this.mapView.graphics.remove(this.textGraphic);
      //this.mapView.graphics.add(this.textGraphic);
      //this.textGraphic.symbol.angle=90;

      this.textSymbol = {
        type: "text",  // autocasts as new TextSymbol()
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        text: this.punkttext,
        xoffset: 10,
        yoffset: 10,
        angle: this.textangle,
        font: {  // autocasts as new Font()
          size: 12,
          family: "Josefin Slab",
          weight: "bold"
        }
      };

      this.textGraphic = new Graphic({
            geometry: this.point,
            symbol: this.textSymbol
      });

      this.mapView.graphics.addMany([this.textGraphic]);
    }
  },
  mounted: function(){
      //console.log('Map Component Mounted');
      this.loadMap();
  }, 

};
</script>
