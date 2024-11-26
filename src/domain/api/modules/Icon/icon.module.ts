import { Module } from '@nestjs/common';

import { IconController } from './icon.controller';
import { IconRepository } from './icon.repository';
import { IconService } from './implement/icon.service.impl';

@Module({
  imports: [],
  providers: [
    IconRepository,
    { provide: 'IconServiceInterface', useClass: IconService },
  ],

  controllers: [IconController],
})
export class IconModule {}
