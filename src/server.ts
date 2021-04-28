import { http } from "./http"
import "./websocket/client"

http.listen(3000, () => {
    console.log("http://localhost:3000");
})