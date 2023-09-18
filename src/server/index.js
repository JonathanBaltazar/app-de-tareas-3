import viteExpress from "vite-express";

import app from "./server.js";

viteExpress.listen(app, app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
