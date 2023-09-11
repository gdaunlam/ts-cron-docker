import { SetMetadata } from '@nestjs/common';
import * as rTracer from '@procontacto/cls-rtracer';
import { v4 as uuid } from 'uuid'

export const SetUuid = () => SetMetadata('tracer', rTracer.set(uuid()));