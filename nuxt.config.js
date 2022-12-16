import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static', head: {
    titleTemplate: '%s - wallet',
    title: 'wallet',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{charset: 'utf-8'}, {name: 'viewport', content: 'width=device-width, initial-scale=1'}, {
      hid: 'description',
      name: 'description',
      content: ''
    }, {name: 'format-detection', content: 'telephone=no'}],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['assets/css/stylesheet.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  build: {

  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [// https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: 'http://localhost:8000'
  }, publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  }, // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'], theme: {
      dark: false, themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  router: {
    middleware: ['auth']
  }, auth: {
    redirect: {
      login: '/login', home: '/', logout: '/login', callback: false, // not used here in our case
    },

    strategies: {

      local: {
        scheme: 'refresh', token: {
          property: 'token', maxAge: 30, type: 'JWT',
        }, refreshToken: {
          property: 'token', data: 'token', maxAge: 60 * 60 * 24 * 30,
        }, user: {
          property: 'user',
        }, endpoints: {
          login: {url: '/api-token-auth/', method: 'POST'},
          refresh: {url: '/accounts/token/refresh', method: 'post'},
          user: {url: '/profile/', method: 'get'},
          logout: false,
        },
      },

    }
  }
}
