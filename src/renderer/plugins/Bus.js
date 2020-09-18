export default{
  install(Vue,options){

    const EventBus = new Vue()
    Object.defineProperties(Vue.prototype, {
      $bus: {
        get: () => EventBus,
        set:(evt) => {
          if (typeof evt === 'string') evt = [evt]
          EventBus.$emit.apply(EventBus, evt)
        }
      }
    })
    Vue.mixin({
      created() { //add option "$bus" instead bus.$on in created hook
        var $bus = this.$options.$bus
        this.$busListeners = {}
        for (var name in $bus) {
          this.$busListeners[name] = $bus[name].bind(this) //rebind and remember each declared listener
          EventBus.$on(name, this.$busListeners[name]) //register a listener for the event
        }
      },
      beforeDestroy() { //unreg listeners
        for (var name in this.$busListeners) EventBus.$off(name, this.$busListeners[name])
        this.$busListeners = null
      }
    })
  }
}
