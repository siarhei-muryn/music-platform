import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTrackDto } from './dto/create.track.dto';
import { PlayTrackDto } from './dto/play.track.dto';
import { RemoveTrackDto } from './dto/remove.track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  //editTrack
  //getTrack
  //getTracks
  //removetrack count--

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'track', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ]),
  )
  async upload(
    @UploadedFiles() files,
    @Req() request: Request,
    @Body() dto: CreateTrackDto,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return await this.trackService.uploadTrack(token, files, dto);
  }

  @Post('/play')
  @UsePipes(new ValidationPipe())
  async play(@Body() dto: PlayTrackDto) {
    return await this.trackService.play(dto.track_id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async remove(@Body() dto: RemoveTrackDto) {
    return await this.trackService.remove(dto.track_id);
  }
}
