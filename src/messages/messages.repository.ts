import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);
    return messages[id];
  }

  async findAll() {
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);
    console.log(messages);
    return messages;
  }

  async create(message: string) {
    const id = Math.floor(Math.random() * 999);
    const content = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(content);

    messages[id] = { id, content: message };
    await writeFile('messages.json', JSON.stringify(messages));
    return JSON.stringify(messages);
  }
}
