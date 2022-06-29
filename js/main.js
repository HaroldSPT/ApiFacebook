const API = "https://graph.facebook.com/v14.0/";
const AT = "EAAQUDXtOgSYBAItn6w1RIuSVu8geOtwbQaMDbYsMZB2gwYc9cNUkEer4ZATBQVMBUstuMNx7Vo3gWDoO1jTRw0DzdkitxTyvIghxhzwrHk05ZA3xiRWZBQya062DHhidTwG6NNTFZCRpwpbl9ALtZAHirn8X1mkf1CmHCkSzQqtpWVGiMUiWJsG8yxpiGZAiaEZD";
const CS = "?fields=id,name,picture&access_token="

const app = Vue.createApp({
  data() {
    return {
      busqueda: null,
      error: null,
      result: null,
      favorite: new Map()
    }
  },

  created() {
    const SavedFavorites = JSON.parse(window.localStorage.getItem("myfav"))
    if(SavedFavorites?.length){
        const FavoriteRebuild = new Map(SavedFavorites.map(alias=>[alias.id,alias]))
        this.favorite = FavoriteRebuild
    }
  },

  computed: {
    isFavorite(){
      return this.favorite.has(this.result.id)
    },

    allFavorites(){
      return Array.from(this.favorite.values())
    }
  },

  methods: {
    async Buscar() {
      this.result = this.error = null
      try {
        const response = await fetch(API + this.busqueda + CS + AT)
        if(!response.ok) throw new Error("Usuario no econtrado")
        const data = await response.json()
        console.log(data)
        this.result = data
      } catch (error) {
        this.error = error
      } finally {
        this.busqueda
      }
    },

    addFavorite(){
      this.favorite.set(this.result.id, this.result)
      this.updateStorage()
    },

    removeFavorite(){
      this.favorite.delete(this.result.id)
      this.updateStorage()
    },

    updateStorage(){
      window.localStorage.setItem('myfav', JSON.stringify(this.allFavorites))
    },

    showFavorite(par){
      this.result = par
    }
  }
})