<template>
  <div :class="{ tall: [1, 3, 4, 5].includes(index) }" class="card" >
    <img loading="eager" class="photo-card" :src="photo?.urls?.regular" />
    <!-- Tint overlay -->
    <div class="overlays"></div>
    <div class="info">
      <p>{{ photo?.user?.name }}</p>
      <span>{{ photo?.user?.location }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  photo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<style scoped lang="scss">
.info{
  p{
    font-size: 18px;
    color: #F7F6F6;
  }

  span{
    font-size: 14px;
    color: #867f7f;
  }
}

.overlays {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  z-index: 1; 
}
</style>