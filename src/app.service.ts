import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(v: number): string {
    console.log(v);
    return 'Hello World!';
  }
}
