<template>
  <b-alert v-if="errors" show variant="danger">
              <li v-for="(error,index) in errors" :key="index">
                {{ error }}
              </li>
            </b-alert>
</template>

<script>
export default {
    props:{
        errors:[Array]
    }
}
</script>
