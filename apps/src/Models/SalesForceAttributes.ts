import { ApiProperty } from '@nestjs/swagger';
import EnumModelMessages from 'apps/src/Enums/EnumModelMessages';
import { IsNotEmpty, IsString } from 'class-validator';
export default class SalesForceAttributes {
  @ApiProperty({ type: String, description: 'type' })
  @IsNotEmpty({ message: EnumModelMessages.IS_EMPTY })
  @IsString()
  type: string;

  public constructor(type: string) {
    this.type = type;
  }

  public static create(type: string) {
    return new SalesForceAttributes(type);
  }
}
