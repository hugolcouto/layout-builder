const app = new Vue({
    el: "#app",
    data() {
        return {
            title: "HTML page builder helper"
        }
    },
    created() {
        info: {
            console.log(`
>> HTML page builder helper version 1.2.0
>> Written by Hugo Couto - 2019
>> Please visit my portfolio: https://hugolcouto.github.io/me 
            `);
        }
    }
})