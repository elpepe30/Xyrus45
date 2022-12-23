const { model, Schema } = require("mongoose");

module.exports = model("ticket", new Schema({

    ServidorId: String,
    ServidorN: String,
    TranscriptId: String,
    TranscriptN: String,
    UsuarioId: String,
    UsuarioN: String,
    CanalId: String,
    CanalN: String,
    ParentId: String,
    ParentN: String,
    RolId: String,
    RolN: String,
    Imagen: String,
    TicketUsers: [

        {

            username: String,
            userid: String,
            ticketid: String,
            cerrado: Boolean,
            reclamado: Boolean,
            canalticid: String,
            canalticn: String,
            tipo: String

        }
    ]

}))