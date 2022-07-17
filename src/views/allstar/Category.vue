<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Categories</strong>
        </CCardHeader>
        <CCardBody>
          <CButton color="secondary" class="mb-2">
            <CIcon icon="cil-plus" class="me-2" />
            Add category
          </CButton>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(a, i) in categories.data" :key="i">
                <CTableHeaderCell scope="row">{{ a.id }}</CTableHeaderCell>
                <CTableDataCell>{{ a.name }}</CTableDataCell>
                <CTableDataCell>{{ a.slug }}</CTableDataCell>
                <CTableDataCell>Action</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Category',
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      searchText: '',
      searchInput: '',
      searchedColumn: '',
      perPage: 15,
      filter: {
        slug: '',
        name: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      categories: 'category/categories',
    }),
  },
  created() {
    this.fetch({
      sortField: 'id',
      sortOrder: 'descend',
      page: 1,
    })
  },
  methods: {
    fetch(params) {
      this.$store.dispatch('category/getCategory', {
        perPage: this.perPage,
        slug: this.filter.slug ?? '',
        name: this.filter.name ?? '',
        sort: {
          field: params.sortField ?? 'id',
          order: params.sortOrder ?? 'descend',
        },
        params: {
          page: params.page ?? 1,
        },
      })
    },
  },
}
</script>
