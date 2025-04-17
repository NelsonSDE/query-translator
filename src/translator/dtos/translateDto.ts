import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Language } from '../enums/language.enum';

export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  @IsEnum(Language)
  source: Language;

  @IsEnum(Language)
  @IsNotEmpty()
  target: Language;
}
