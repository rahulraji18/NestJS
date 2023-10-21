import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Connection', 'psychoz')
  getHello(): { name: string } {
    // const sam = 1;
    // return this.appService.getHello(sam);
    return { name: 'heloI' };
  }
}
