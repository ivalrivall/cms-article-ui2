<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Name"
                    v-model="name"
                    autocomplete="name"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cilUser" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    v-model="username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    v-model="email"
                    autocomplete="email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cilUser" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Phone"
                    v-model="phone"
                    autocomplete="phone"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="passwordConfirmation"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success" @click="register" class="text-white">
                    Create Account
                  </CButton>
                </div>
                <div class="d-grid mt-2">
                  <CButton
                    color="primary"
                    class="text-white"
                    @click="$router.replace('Login')"
                  >
                    Go to Login
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      phone: '',
      email: '',
      passwordConfirmation: '',
      password: '',
      name: '',
      active: true,
    }
  },
  methods: {
    async register() {
      try {
        const resp = await this.$store.dispatch('auth/register', {
          username: this.username,
          name: this.name,
          phone: this.phone,
          email: this.email,
          role_id: 1,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        if (resp.data.success) {
          this.openNotification(
            'Berhasil',
            'success',
            'Register Berhasil Silahkan login',
          )
        }
        this.$router.replace('/login')
      } catch (e) {
        this.loading = false
        const err = e?.response.data.message ?? e
        this.openNotification('Perhatian', 'error', err)
      }
    },
  },
}
</script>
b
