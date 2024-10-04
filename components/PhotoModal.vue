<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <icon class="close-icon" name="close" :size="34" color="#F4F7FB" @click="emits('close-modal')" />
      <div class="modal-content">
        <img :src="photo?.urls.regular" :alt="photo.description" />
        <div class="photo-info">
          <p>{{ photo?.user.name }}</p>
          <span>{{ photo?.user.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
 const emits = defineEmits(['close-modal'])
 const props = defineProps({
   photo: {
     type: Object,
     required: true
   }
 })
</script>

<style scoped lang="scss">
.modal-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  z-index: 1000;
}
.modal-card{
  width: 70%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.close-icon{
  align-self: flex-end;
}
.modal-content{
  border-radius: 15px;
  background-color: #FFFFFF;
  width: 95%;

  img{
    width: 100%;
    object-fit: cover;
    height: 600px;
    border-radius: 15px 15px 0 0;
    object-position: center;
  }
}

.photo-info{
  padding: 40px;

  p{
    color: #293649;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  span{
    color: #91959B;
    font-size: 16px;
    font-weight: 400;
  }
}

</style>
