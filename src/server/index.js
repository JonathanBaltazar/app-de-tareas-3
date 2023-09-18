import viteExpress from "vite-express";

import app from "./server.js";

// app.listen(app.get("port"), () => {
//     console.log(`Server on port ${app.get("port")}`);
// });

viteExpress.listen(app, 3000, () => {
    console.log("Server on port 3000");
});
