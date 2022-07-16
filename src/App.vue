<template>
  <CToaster placement="top-end">
    <CToast v-for="(toast, index) in toasts" :key="index">
      <CToastHeader closeButton>
        <svg
          class="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" :fill="fillColor(toast.type)"></rect>
        </svg>
        <span class="me-auto fw-bold">{{ toast.title }}</span>
        <!-- <small>7 min ago</small> -->
      </CToastHeader>
      <CToastBody>
        {{ toast.content }}
      </CToastBody>
    </CToast>
  </CToaster>
  <router-view />
</template>
<script>
export default {
  methods: {
    fillColor(type) {
      if (type == 'error') {
        return '#dc3545'
      }
      if (type == 'success') {
        return '#198754'
      }
    },
  },
  created() {
    // this.$store.dispatch('auth/getInfoAccount')
  },
}
</script>
<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
