import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import EnumModelMessages from '../../../Enums/EnumModelMessages';

export default class PostContactRequest {
  @ApiProperty({
    type: String,
    description: 'FirstName',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  FirstName: string;
  @ApiProperty({
    type: String,
    description: 'MiddleName',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  MiddleName: string;
  @ApiProperty({
    type: String,
    description: 'LastName',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  LastName: string;
  @ApiProperty({
    type: String,
    description: 'Company',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Company: string;
  @ApiProperty({
    type: Number,
    description: 'CustNum',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  CustNum: number;
  @ApiProperty({
    type: String,
    description: 'email',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Email: string;
  @ApiProperty({
    type: String,
    description: 'Phone',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Phone: string;
  @ApiProperty({
    type: Boolean,
    description: 'Activo',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsBoolean()
  Activo: boolean;
}
