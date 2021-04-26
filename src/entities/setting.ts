import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from "typeorm";

import { v4 as uuid } from "uuid"

@Entity("settings")
class Setting {
    @PrimaryColumn({name: "id"})
    id: string;

    @Column({name: "username"})
    username: string;

    @Column({name: "chat"})
    chat: boolean;

    @UpdateDateColumn({name: "updated_at"})
    updated_at: Date;

    @CreateDateColumn({name: "created_at"})
    created_at: Date;

    constructor() {
        if (!this.id) { //Checa se for atualização de dados
            this.id = uuid()
        }
    }
}


export { Setting }