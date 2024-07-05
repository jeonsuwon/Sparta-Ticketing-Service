import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Patch, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateShowDto } from './dto/create.show.dto';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
    getShow(){
      const data = this.showService.getShow();
      return data
    }

  @Post()
    createShow(@Body() createShowDto:CreateShowDto) {
      const {showTitle, showContent, showCategory, showAddress, showDate} = createShowDto;
      const data = this.showService.createShow(showTitle, showContent, showCategory, showAddress, showDate);
      return data
    }

  @Patch(':id')
    updateShow(@Param('id') id: number, @Body() updateShowDto:CreateShowDto){
      const {showTitle, showContent, showCategory, showAddress, showDate} = updateShowDto;
      const data = this.showService.updateShow(id, showTitle, showContent, showCategory, showAddress, showDate);
      return data
    }
    
  @Delete(':id')
    DeleteShow(@Param('id') id: number){
      const data = this.showService.deleteShow(id)
      if(data) return {message: "정상적으로 삭제되었습니다."}
    }
}