<template>
  <el-select 
    v-model="selectedValue" 
    placeholder="请选择"
    style="width: 200px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <div style="display: flex; align-items: center;">
        <img :src="item.image" style="width: 20px; height: 20px; margin-right: 10px;">
        <span>{{ item.label }}</span>
      </div>
    </el-option>
    
    <!-- 自定义选中后的显示 -->
    <template #prefix>
      <img 
        v-if="selectedImage" 
        :src="selectedImage" 
        style="width: 20px; height: 20px; margin-right: 5px;">
    </template>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: '',
      options: [
        { value: 'option1', label: '选项1', image: '/path/to/image1.png' },
        { value: 'option2', label: '选项2', image: '/path/to/image2.png' },
        { value: 'option3', label: '选项3', image: '/path/to/image3.png' }
      ]
    }
  },
  computed: {
    selectedImage() {
      const selected = this.options.find(item => item.value === this.selectedValue);
      return selected ? selected.image : '';
    }
  }
}
</script>
