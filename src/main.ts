import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { initialStore } from "./domain/store/store";
import { router } from "./app.routes";
import naive from "naive-ui";
const app = createApp(App);

initialStore(app);

app.use(router);
app.use(naive);
app.mount("#app");
