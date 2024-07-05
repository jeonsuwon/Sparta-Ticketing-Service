import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateShowDto } from './dto/create.show.dto';
import { Show } from './entities/show.entity';
import { time } from 'console';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async getShow(){
    const data = await this.showRepository.find()
    return data
  }

  async createShow(showTitle:string, showContent:string, showCategory:string, showAddress:string, showDate:string) {
    const data = {
      showTitle,
      showContent,
      showCategory,
      showAddress,
      showDate,
    };
    await this.showRepository.save(data);
    return data
  }

  async updateShow(id:number, showTitle:string, showContent:string, showCategory:string, showAddress:string, showDate:string){
    const show = await this.showRepository.findOne({
      where: {id},
    })
    if(!show) {
      throw new NotFoundException('해당 공연정보는 존재하지 않습니다.');  
    }
    await this.showRepository.update(
      {id},//첫번재는 where
      {
        showTitle,
        showContent,
        showCategory,
        showAddress,
        showDate
      }
    )
    const updatedData = await this.showRepository.findOne({
      where: {id},
    })
    return updatedData;
  }

  async deleteShow(id:number){
    const findShow = await this.showRepository.findOne({
      where: {id},
    })
    if(!findShow) throw new NotFoundException("해당 공연정보가 존재하지 않습니다.")
    const deleteShow = await this.showRepository.delete(
      {id}
    )
    if(deleteShow) return true
  }
}