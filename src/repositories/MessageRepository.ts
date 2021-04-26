import {EntityRepository, Repository} from "typeorm";
import {Message} from "../entities/messages";

@EntityRepository(Message)
class MessageRepository extends Repository<Message>{}

export { MessageRepository }