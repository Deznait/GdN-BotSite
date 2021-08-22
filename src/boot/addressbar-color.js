import { useQuasar } from 'quasar'

export default {
  setup() {
    // equivalent to calling this on creating the component
    const $q = useQuasar()
    $q.addressbarColor.set()
  }
}