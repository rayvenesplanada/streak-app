import { Module } from '@nestjs/common';
import { StreaksController } from './streaks/streaks.controller';
import { StreaksService } from './streaks/streaks.service';

@Module({
  imports: [],
  controllers: [StreaksController],
  providers: [StreaksService],
})
export class AppModule {}
