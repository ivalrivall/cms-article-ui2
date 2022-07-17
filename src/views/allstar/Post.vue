<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Posts</strong>
        </CCardHeader>
        <CCardBody>
          <CButton color="secondary" class="mb-2">
            <CIcon icon="cil-plus" class="me-2" />
            Add post
          </CButton>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(a, i) in articles.data" :key="i">
                <CTableHeaderCell scope="row">{{ a.id }}</CTableHeaderCell>
                <CTableDataCell>{{ a.title }}</CTableDataCell>
                <CTableDataCell>{{ a.category.name }}</CTableDataCell>
                <CTableDataCell>{{ a.url }}</CTableDataCell>
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
  name: 'Post',
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
        description: '',
        title: '',
        url: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      articles: 'article/articles',
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
      this.$store.dispatch('article/getArticle', {
        perPage: this.perPage,
        description: this.filter.description ?? '',
        title: this.filter.title ?? '',
        url: this.filter.url ?? '',
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
