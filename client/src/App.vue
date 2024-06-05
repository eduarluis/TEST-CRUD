<template>
    
    <nav-com></nav-com>

    <div class="container">
        <router-view />
    </div>
</template>

<script>

    import NavComponent from '@/components/NavComponent.vue';

    export default {
        components: {
            'nav-com' : NavComponent
        }
    }
</script>