import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TranslateDto } from './dtos/translateDto';
import { TranslatorService } from './service';

@Controller('translate')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post()
  @HttpCode(200)
  translate(@Body() data: TranslateDto) {
    return this.translatorService.translate(data);
  }
}
