<template>
<v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="d-flex" cols="12" sm="4">
            <v-card
              class="mx-auto"
              width="100%"
            >
            <v-text-field
              label="type longitude"
              v-model="longin"
              v-on:input="longChanged()"
            ></v-text-field>
            <v-text-field
              label="clicked at longitude"
              v-model="longout"
            ></v-text-field>
            <v-text-field
              label="type angle"
              v-model="textangle"
            ></v-text-field>
            <v-text-field
              label="type textlabel"
              v-model="punkttext"
            ></v-text-field>
            </v-card>
          </v-col>
          <v-col class="d-flex" cols="12" sm="8">
            <v-card
              class="mx-auto"
              width="100%"
              height="500px"
            >
            <esri-map v-bind:longin="longin" v-bind:textangle="textangle" v-bind:punkttext="punkttext" @clicked="onClickChild"></esri-map>
            </v-card>
          </v-col>          
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
 /* eslint-disable */
 import EsriMap from './Map.vue';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      longin: "11.6",
      longout: "",
      textangle: "60",
      punkttext: "point label"
    }),
    components: { "esri-map": EsriMap},
    methods: {
      longChanged(){
        console.log("in longCganged");
      },
      onClickChild (value) {
        console.log(value) // someValue
        this.longout=value;
      }
    }
  }
</script>
