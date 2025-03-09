import type { MenuItem } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<MenuItem[]>([])
  const cuurrentTab = ref({name:'数据看板',url:'/dashboard'})

  // 添加新标签页
  const addTab = (name:string,url:string,icon:string) => {
    // 检查是否存在具有相同 URL 的标签页
    if(!tabs.value.some(item => item.url === url)){
      tabs.value.push({name,url,icon})
    }
  }
  // 切换当前标签页
  const setCurrentTab = (name:string,url:string) => {
    cuurrentTab.value = {name,url}
  }

  // 删除标签页
  const removeTab=(name:string)=>{
      //如果删除的是高亮的
      if(cuurrentTab.value.name===name){
          //如果删除的是最后一个
          const currentIndex=tabs.value.findIndex(tab=>tab.name===name);
          if(currentIndex!=0){
              cuurrentTab.value=tabs.value[currentIndex-1]
          }else{
              return 
          }
      }
      // 删除
      tabs.value=tabs.value.filter(tab=>tab.name!==name)
  }
  return { tabs, addTab, cuurrentTab, setCurrentTab, removeTab }

})