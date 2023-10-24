import { Controller, Get,Session } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('stories')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Session() session:Record<string,any>){
    return this.postsService.getPosts(session);
  }
}
