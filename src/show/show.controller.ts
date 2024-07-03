import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateShowDto } from './dto/update.show.dto';
import { ShowService } from './show.service';

@UseGuards(RolesGuard)
@Controller('team')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    await this.showService.create(file);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateshowDto: UpdateShowDto) {
    await this.showService.update(id, updateshowDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.showService.delete(id);
  }
}