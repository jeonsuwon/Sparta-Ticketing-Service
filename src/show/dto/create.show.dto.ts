import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: 'showTitle(공연제목)을 입력해주세요.' })
  showTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'showContent(공연설명)를 입력해주세요.' })
  showContent: string;

  @IsString()
  @IsNotEmpty({ message: 'showCategory(공연장르)를 입력해주세요.' })
  showCategory: string;

  @IsString()
  @IsNotEmpty({ message: 'showAddress(공연장소)를 입력해주세요.' })
  showAddress: string;

  @IsString()
  @IsNotEmpty({ message: 'showDate(공연날짜)를 입력해주세요.' })
  showDate: string;
}