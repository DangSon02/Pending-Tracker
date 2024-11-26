import { Injectable } from '@nestjs/common';
import { IconRepository } from '../icon.repository';
import { IconServiceInterface } from '../icon.service';

@Injectable()
export class IconService implements IconServiceInterface {
  constructor(private readonly iconRepository: IconRepository) {}

  async getAllIconImages(): Promise<any> {
    console.log('ok2');
    return await this.iconRepository.findAllIconImages();
  }
}
