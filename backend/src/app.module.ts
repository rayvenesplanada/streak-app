import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreaksController } from './streaks/streaks.controller';
import { StreaksService } from './streaks/streaks.service';

@Module({
  imports: [],
  controllers: [AppController, StreaksController],
  providers: [AppService, StreaksService],
})
export class AppModule {}
