<template>
      <div :class="{ tall: [1, 3, 4, 5].includes(index) }"  class="card" v-for="(photo, index) in  Array.from({ length: 8 }, () => null)" :key="photo">
        <img class="photo-card" />
        <div class="info">
          <p class="skeleton"></p>
          <span class="skeleton"></span>
        </div>
      </div>
</template>

<script setup>

</script>

<style scoped>
  .skeleton {
    animation: skeleton-loading 1s linear infinite alternate;
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(0, 0%, 80%);
    }
    100% {
      background-color: hsl(0, 0%, 95%);
    }
  }
  .info p{
    height: 20px;
    width: 60%;
    margin-bottom: 10px;
  }
  .info span{
    height: 20px;
    display: block;
    width: 30%;
  }
</style>