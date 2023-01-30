import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { TagTrackController } from './tag.track.controller';
import { TagTrackService } from './tag.track.service';
import { tagTrackProviders } from './tag.track.providers';
import { TagModule } from '../tag.module';

@Module({
  imports: [DatabaseModule, TagModule],
  controllers: [TagTrackController],
  providers: [TagTrackService, ...tagTrackProviders],
})
export class TagTrackModule {}
