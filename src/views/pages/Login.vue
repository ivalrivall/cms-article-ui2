<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="userId"
                      placeholder="Username"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="login()">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton
                        color="link"
                        class="px-0"
                        @click="$router.push('register')"
                      >
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton
                    color="light"
                    variant="outline"
                    class="mt-3"
                    @click="$router.push('Register')"
                  >
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userId: '',
      password: '',
      active: true,
      params: {
        client_id:
          '275183478083-qruf8p689tcnepps0dnj0rrssk3v0pc0.apps.googleusercontent.com',
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
    error() {
      return this.$store.getters['auth/error']
    },
  },
  watch: {
    error(newVal) {
      this.openNotification('Perhatian', 'error', newVal.message)
    },
  },
  // mounted() {
  //   this.checkLogin()
  // },
  methods: {
    async login() {
      const data = {
        userId: this.userId,
        password: this.password,
      }
      await this.$store.dispatch('auth/login', data)
    },
    checkLogin() {
      // console.log('login this.isLoggedIn', this.isLoggedIn)
      if (this.isLoggedIn) {
        this.$router.push('/dashboard')
      }
    },
    async loginGoogle() {
      // const googleUser = await this.$gAuth.signIn()
      // console.log('getBasicProfile', googleUser.getBasicProfile())
      // console.log('getAuthResponse', googleUser.getAuthResponse())
    },
    // onSuccess(googleUser) {
    //   console.log('googleUser', googleUser)
    //   // This only gets the user information: id, name, imageUrl and email
    //   console.log('getBasicProfile', googleUser.getBasicProfile())
    // },
    // onFailure(e) {
    //   console.log('on failure', e)
    // },
    async onSuccessLogout() {
      // const googleUser = await this.$gAuth.currentUser.get()
      // console.log('response logout', googleUser)
      // await googleUser.disconnect()
      // await this.$gAuth.disconnect()
      await this.$gAuth.signOut()
    },
  },
}
</script>
