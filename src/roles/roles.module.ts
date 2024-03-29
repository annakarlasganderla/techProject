import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';

@Module({
  controllers: [],
  providers: [RolesService],
})
export class RolesModule {}
