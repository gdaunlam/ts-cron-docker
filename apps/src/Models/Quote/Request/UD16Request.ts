import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
export default class UD16Request {
  GlobalUD16: boolean;
  GlobalLock: boolean;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Zona_c: string;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Company: string;
  SysRevID: number;
  @ApiProperty({
    type: String,
    example: '00000000-0000-0000-0000-000000000000',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  SysRowID: string;
  BitFlag: number;
  RowMod: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Empleado_c: string;
  UD_SysRevID: string;
  @ApiProperty({
    type: String,
    example: '2022-12-19T22:40:55.811Z',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Fecha_c: string;
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  Cantidad_c: number;
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  CantidadSurtida_c: number;
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  CantidadRestante_c: number;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Estatus_c: string;
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  IdFolio_c: number;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Folio_c: string;
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsNumber()
  IdProductoFolio_c: number;
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Planta_c: string;
  Plataforma_c: number;
  @ApiProperty({
    type: String,
    example: '6001-015-025-362',
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  CentroCostos_c: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  IdEmpleado_c: string;
}
