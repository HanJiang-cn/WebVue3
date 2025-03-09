import { defineStore } from 'pinia'
import type { RowType } from '@/types/station'
import { ref } from 'vue'

export const useStationStore = defineStore('station', () => {
    const rowData = ref({
        name: '',
        id: '',
        city: '',
        person: '',
        tel: '',
        fast: '',
        slow: '',
        status: '',
        now: '',
        fault: ''
    })

    const setRowData = (row:any) => {
            rowData.value = row
    }

    // 初始化
    const initRowData = () => {
        rowData.value = {
            name: '',
            id: '',
            city: '',
            person: '',
            tel: '',
            fast: '',
            slow: '',
            status: '',
            now: '',
            fault: ''
        }
    }

    return {
        rowData, setRowData, initRowData
    }

})
