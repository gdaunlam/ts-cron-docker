import { ApiProperty } from '@nestjs/swagger';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class PostCustomerRequest {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Name: string;
  @ApiProperty({ type: String, description: 'fiscal name', required: false })
  Nombre_largo_fiscal: string;
  @ApiProperty({ type: String, description: 'id customer' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  ID_Customer: string;
  @ApiProperty({ type: Number, description: 'customer num', required: false })
  Nro_Customer: number;
  @ApiProperty({ type: String, description: 'city' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Ciudad: string;
  @ApiProperty({ type: String, description: 'zip' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Zip_C_P: string;
  @ApiProperty({ type: String, description: 'resale id', required: false })
  ID_Reventa: string;
  @ApiProperty({ type: String, description: 'fax', required: false })
  Fax: string;
  @ApiProperty({ type: String, description: 'phone', required: false })
  Phone: string;
  @ApiProperty({ type: String, description: 'comment', required: false })
  Description: string;
  @ApiProperty({ type: Date, description: 'estdate', required: false })
  Fecha_de_fundaci_n: Date;
  @ApiProperty({ type: String, description: 'fax', required: false })
  fax: string;
  @ApiProperty({
    type: String,
    description: 'country num',
    required: false,
    example: '0',
  })
  Nro_Pais: string;
  @ApiProperty({ type: String, description: 'bt city', required: false })
  BTCiudad: string;
  @ApiProperty({ type: String, description: 'bt colonia', required: false })
  BT_Colonia: string;
  @ApiProperty({ type: String, description: 'bt address 1', required: false })
  BTCalle: string;
  @ApiProperty({ type: String, description: 'bt zip', required: false })
  BTZip_C_P: string;
  @ApiProperty({ type: Number, description: 'bt country num', required: false })
  BTNro_Pa_s: number;
  @ApiProperty({ type: String, description: 'bt country', required: false })
  BTPa_s: string;
  @ApiProperty({ type: String, description: 'bt phone num', required: false })
  BTNro_Tel_fono: string;
  @ApiProperty({ type: String, description: 'bt fax', required: false })
  BTNro_Fax: string;
  @ApiProperty({
    type: String,
    description: 'bill frequency',
    required: false,
    example: 'W',
  })
  BillFrequency: string;
  @ApiProperty({ type: String, description: 'subzone' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  Subzona: string;
  @ApiProperty({ type: String, description: 'correos copia', required: false })
  CorreosCopia: string;
  @ApiProperty({
    type: String,
    description: 'ship via code',
    required: false,
    example: '',
  })
  Forma_de_entrega: string;
  @ApiProperty({ type: String, description: 'credit hold', required: false })
  CrediHold: string;
  @ApiProperty({ type: String, description: 'bt name', required: false })
  Nombre_de_facturaci_n: string;
  @ApiProperty({ type: String, description: 'customer type', required: true })
  @IsNotEmpty()
  @IsString()
  Tipo_Customer: string;
  @ApiProperty({ type: String, description: 'address1', required: true })
  @IsNotEmpty()
  @IsString()
  Calle: string;
  @ApiProperty({ type: Number, description: 'address2', required: true })
  @IsNotEmpty()
  @IsNumber()
  N_mero: number;
  @ApiProperty({ type: String, description: 'address3', required: true })
  @IsNotEmpty()
  @IsString()
  Colonia: string;
  @ApiProperty({
    type: String,
    description: 'territory id',
    required: true,
    example: '0025',
  })
  @IsNotEmpty()
  @IsString()
  ID_Zona: string;
}
