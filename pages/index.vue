<template>
  <div class="wrapper">
    <PhotoModal v-if="currentPhoto" @close-modal="currentPhoto = null" :photo="currentPhoto" />
    <div class="container">
      <h4 v-if="searchValue">Search Results for <span>"{{ searchValue }}"</span></h4>
      <h4 v-else-if="searching">Searching for <span>"{{ searchTerm }}"</span></h4>
      <div class="search-container" v-else>
        <icon @click="handleSearch" name="search" :size="26" color="#5C6A82" />
        <input 
          placeholder="Search for photo" 
          v-model="searchTerm" 
          @keydown.enter="handleSearch" 
          type="text" 
        />
      </div>
    </div>
    <div class="grid-parent">
      <!-- skeleton loader for when the photos are fetching -->
      <Skeleton v-if="loading" />
      <!-- renders the photos -->
      <ImageCard v-for="(photo, index) in allPhotos" :key="photo?.id" :index="index" :photo="photo" @click="currentPhoto = photo" />
    </div>
  </div>
</template>

<script setup>
const allPhotos = ref([])
const api = useApi()
const loading = ref(true)
const searching = ref(false)
const searchTerm = ref("")
const currentPhoto = ref(null)
const searchValue = ref('')


onMounted(async () => {
  allPhotos.value = await fetchRandomPhoto()
})

const fetchRandomPhoto = async () => {
  loading.value = true
  try{
    const {data} = await api('/photos/random', {
      params: {
        count: 8
      }
    })
    return data
  }catch(err){
    console.log(err)
    return []
  }finally{
    loading.value = false
  }
}

// search is triggered by clickin on the search icon or by pressing enter
const handleSearch = async () =>{
  if(!searchTerm.value || searchTerm.value.length < 3) return
  loading.value = true
  searching.value = true
  try {
    const {data} = await api('/search/photos', {
      params: {
        query: searchTerm.value,
        per_page: 8
      },
    })
    if(data.results.length > 0){
      allPhotos.value = data.results
      searchValue.value = searchTerm.value
      searchTerm.value = ''
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
  }finally{
    loading.value = false
    searching.value = false
  }
}

</script>

<style scoped lang="scss">
  $primary-color: #5C6A82;
  $secondary-color: #53657A;
  $background-color: #DDE2E8;
  $white-color: #FFFFFF;
  @mixin box-shadow {
    box-shadow: 
      rgba(0, 0, 0, 0.1) 0 2px 2px,
      rgba(0, 0, 0, 0.1) 0 4px 4px,
      rgba(0, 0, 0, 0.1) 0 8px 8px,
      rgba(0, 0, 0, 0.1) 0 16px 16px,
      rgba(0, 0, 0, 0.1) 0 32px 32px,
      rgba(0, 0, 0, 0.1) 0 64px 64px;
  }
  .wrapper {
    position: relative;
  }
.grid-parent{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-flow:dense;
  grid-auto-rows: 300px;
  justify-content: center;
  gap: 30px;
  max-width: 70%;
  margin: auto;
  margin-top: -60px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $background-color;
  min-height: 300px;
}
.search-container{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 26px;
  border-radius: 10px;
  width: 80%;
  background-color: $white-color;
  @include box-shadow;
}
h4{
  font-size: 24px;
  color: $secondary-color;

  span {
    color: $primary-color;
  }
}

input{
  font-size: 20px;
  color: $primary-color;
  font-weight: 500;
  background-color: transparent;
  flex: 1;

  &::placeholder{
    color: $primary-color;
    font-weight: 500;
  }
}

</style>