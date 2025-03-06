  <!-- <template>
  <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <document />
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <my-menu v-for="child in item.children" :key="child.url" :item="child"></my-menu>
    </el-sub-menu>
 <el-menu-item v-else :index="item.url" @click="add(item.name, item.url, item.icon)" v-show="!(item.name == '订单详情')">
        <el-icon>
            <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MenuItem as MenuItemType } from "../../types/user/index";
import { useTabsStore } from '@/store/tabs';
export default defineComponent({
    name: 'MyMenu', // 你可以给组件起一个名字
    props: {
        item: {
            type: Object as PropType<MenuItemType>,
            required: true
        }
    },
    setup() {
        const tabsStore=useTabsStore();
        const {addTab}=tabsStore;
        function add(name: string, url: string, icon: string) {
            addTab(name, url, icon)
        }
        return {add }
    }
});
</script> -->