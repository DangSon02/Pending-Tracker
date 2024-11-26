import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ResponseData } from 'src/common/exception/ResponseData';
import { IconServiceInterface } from './icon.service';

@Controller('icon')
export class IconController {
  constructor(
    @Inject('IconServiceInterface')
    private readonly iconService: IconServiceInterface,
  ) {}

  @Get('')
  async getAllIcon(): Promise<ResponseData<any>> {
    const result = await this.iconService.getAllIconImages();

    return new ResponseData<any>(
      HttpStatus.OK,
      'get all icon success!',
      result,
    );
  }
}
