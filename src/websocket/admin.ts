import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";



io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesServices = new MessagesService()

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id }  = params;

        const allMessages = await messagesServices.listByUser(user_id)

        callback(allMessages);
    });

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;
        //Arrumar admin_id;
        await messagesServices.create({
            text,
            user_id,
            // admin_id: "0fc39ec6-344a-4145-808d-38c95533c42e",
        })

        const { socket_id } = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket_id,
        });
    })

    socket.emit("admin_user_in_support", async (params) => {
        const { user_id } = params;

        const { socket_id } = await connectionsService.findByUserId('admin');

        await connectionsService.updateAdminID(user_id, socket_id);

        const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    })
})