var app = new Vue({
    el: '#app',
    data: {
        message: `Hello Word!` + new Date().toLocaleString()
    },
    methods: {
        click: () => this.message = `Hello Word!` + new Date().toLocaleString()
    }
});
