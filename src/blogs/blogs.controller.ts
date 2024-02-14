import { Controller } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller()
export class BlogsController {
  constructor(private blogsService : BlogsService) {}
}
