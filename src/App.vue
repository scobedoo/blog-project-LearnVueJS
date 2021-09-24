<template>
  <v-app>
    <!-- <v-snackbar
      v-model="snackbarStatus"
      color="blue"
      button
      timeout="2000"
      multi-line
      outlined
      >
      {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbarStatus = false"
          >
          close
          </v-btn>
        </template>
    </v-snackbar> -->
  <alert/>
  <Dialog/>
  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-item v-if="!guest">
        <v-list-item-avatar>
          <v-img :src="user.photo_profile ? apiDomain + user.photo_profile : 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="pa-2" v-if="guest">
        <v-btn block color="primary" class="mb-1" @click="login">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn block color="success">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>

      <v-divider></v-divider>

      <v-list-item
        v-for="(item, index) in menus"
        :key="`menu-${index}`"
        :to="item.route"
      >
        <v-list-item-icon>
          <v-icon left>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
    
    <template v-slot:append v-if="!guest">
      <div class="pa-2">
        <v-btn block color="red" dark @click="logout" >
          <v-icon left>mdi-lock</v-icon>
          Logout
        </v-btn>
      </div>
    
    </template>

  </v-navigation-drawer>


    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>


    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-footer app>
      @sayyidahsan | VueJS
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Alert : () => import('./components/alert.vue'),
    Dialog : () => import('./components/Dialog.vue')
  },

  data: () => ({
    drawer : false,
    menus : [
      { title: 'Home', icon : 'mdi-home', route : '/'},
      { title: 'Blogs', icon : 'mdi-note', route : '/blogs'}
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com"
    // guest : true,
    // snackbarStatus : false,
    // snackbarText : 'Hello Welcome back Sayyid!' 
  }),
  computed: {
    ...mapGetters({
      guest : 'auth/guest',
      user : 'auth/user',
      token : 'auth/token'
    }),
  },
  methods: {
    logout(){
      let config = {
        method: 'post',
        url: this.apiDomain + '/api/v2/auth/logout',
        headers : {
          'Authorization' : 'Bearer' + this.token,
        },
      }
      this.axios(config)
      .then(() => {
        this.setToken('')
        this.setUser({})
        this.setAlert({
        status : true,
        color : 'success',
        text : 'Anda berhasil logout'
        })
      })
      .catch((responses) => {
        this.setAlert({
        status : true,
        color : 'error',
        text : responses.data.error,
        })
      })
    },
    login(){
      // this.guest = false 
      this.setDialogComponent({'component' : 'login'})
    },
    ...mapActions({
      setAlert: 'alert/set',
      setDialogComponent : 'dialog/setComponent',
      setToken : 'auth/setToken',
      setUser : 'auth/setUser',
      checkToken : 'auth/checkToken',
    }),
  },
  mounted(){
    if(this.token){
      this.checkToken(this.token)
    }
  }
};
</script>
