import { Module } from '@nestjs/common';
import { importAllFromRequireContext } from '../Helpers/Utilities/ImportAllFromRequireContext';

@Module({
  imports: [],
  controllers: importAllFromRequireContext(
    require.context('../Controllers/', true),
  ),
  providers: importAllFromRequireContext(require.context('../Services/', true)),
})
export class AppTestModule {}
