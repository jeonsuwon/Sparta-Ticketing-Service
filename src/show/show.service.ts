import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateShowDto } from './dto/update.show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: number) {
    return await this.verifyTeamById(id);
  }

  async create(file: Express.Multer.File) {
    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('CSV 파일만 업로드 가능합니다.');
    }

    const csvContent = file.buffer.toString();

    let parseResult;
    try {
      parseResult = parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {
      throw new BadRequestException('CSV 파싱에 실패했습니다.');
    }

    const showsData = parseResult.data as any[];

    for (const showData of showsData) {
      if (_.isNil(showData.name) || _.isNil(showData.description)) {
        throw new BadRequestException(
          'CSV 파일은 name과 description 컬럼을 포함해야 합니다.',
        );
      }
    }

    const createShowDtos = showsData.map((showData) => ({
      name: showData.name,
      description: showData.description,
    }));

    await this.showRepository.save(createShowDtos);
  }

  async update(id: number, updateShowDto: UpdateShowDto) {
    await this.verifyTeamById(id);
    await this.showRepository.update({ id }, updateShowDto);
  }

  async delete(id: number) {
    await this.verifyTeamById(id);
    await this.showRepository.delete({ id });
  }

  private async verifyTeamById(id: number) {
    const team = await this.showRepository.findOneBy({ id });
    if (_.isNil(team)) {
      throw new NotFoundException('존재하지 않는 팀입니다.');
    }

    return team;
  }
}