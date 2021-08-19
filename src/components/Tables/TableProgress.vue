<template>
    <q-table class="" :rows="data3" :columns="column" title="Puntos">
        
    </q-table>
</template>

<script>
export default {
    name: 'TableProgress',
    data() {
        return {
            column: [
                {
                    name: 'Name',
                    label: 'Name',
                    field: 'name',
                    sortable: true,
                    align: 'left',
                },
                {
                    name: 'Task',
                    label: 'Task',
                    field: 'task',
                    sortable: true,
                    align: 'left',
                },
            ],
            data3: [
                {
                    name: 'Yeeeeeeee',
                    des: 'Developer',
                    Progress: 70,
                    type: 'info',
                    issue: '#125',
                    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                },
                {
                    name: 'Yooooo',
                    des: 'Developer',
                    Progress: 60,
                    type: 'success',
                    issue: '#1425',
                    avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                },
                {
                    name: 'Wololoooo',
                    des: 'Developer',
                    Progress: 30,
                    type: 'warning',
                    issue: '#1475',
                    avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                },
                {
                    name: 'Pikachu',
                    des: 'Developer',
                    Progress: 100,
                    type: 'success',
                    issue: '#134',
                    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
                },
            ],
        }
    },
    methods: {
        getColor(val) {
            if (val > 70 && val <= 100) {
                return 'green'
            } else if (val > 50 && val <= 70) {
                return 'blue'
            }
            return 'red'
        },
    },
}
</script>

<style scoped></style>
