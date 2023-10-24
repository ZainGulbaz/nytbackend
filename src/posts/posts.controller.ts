import { Controller, Get, UseGuards} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('stories')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(){
    return this.postsService.getPosts();
  }
}
