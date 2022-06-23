const API = "https://graph.facebook.com/v14.0/";
const AT = "EAAQUDXtOgSYBAKIOZC54BOEbCUMtUUnr9ee66HyZBf7qLHati0wFUaZAz3RSRZAUWop8xCWXm2pIjEhtyV6Risi5MShG5uZC5QbdHUUyLz80hrxnDo2PWXAwXlMhdBm4qFs5v64RTg6ftyLPKIm4In3slZABivoTfL19IrC4Q8ZCwAz3Iys2VuJ";
const CS = "?fields=id,name,email,picture&access_token="

const app = Vue.createApp({
  data() {
    return {
      busqueda: null,
      error: null,
      result: null
    }
  },

  methods: {
    async Buscar() {
      this.result = this.error = null
      try {
        const response = await fetch(API + this.busqueda + CS + AT)
        //if(!response.ok) throw new Error("Usuario no econtrado")
        const data = await response.json()
        console.log(data)
        this.result = data
      } catch (error) {
        this.error = error
      /*} finally {
        this.busqueda*/
      }
    }
  }
})
