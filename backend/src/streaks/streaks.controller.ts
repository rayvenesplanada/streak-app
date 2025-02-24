import { Controller, Get, Param } from '@nestjs/common';
import { StreaksService } from './streaks.service';

@Controller('streaks')
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get(':case')
  getStreaks(@Param('case') caseId: number) {
    return this.streaksService.getStreaks(caseId);
  }
}
