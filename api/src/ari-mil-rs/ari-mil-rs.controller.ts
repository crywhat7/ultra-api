import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AriMilRsService } from './ari-mil-rs.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDTO } from './dtos/Post.dto';
import { CreateUserDTO } from './dtos/User.dto';
import { ToggleLikeDTO } from './dtos/Like.dto';

@ApiTags('Ari-Mil Red Social')
@Controller('arimil')
export class AriMilRsController {
  constructor(private readonly arimilService: AriMilRsService) {}

  // ! Misc
  @Get('paises')
  async getPaises() {
    return await this.arimilService.getPaises();
  }

  // ! Publicaciones
  @Get('posts')
  async getPosts() {
    return await this.arimilService.getPosts();
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string) {
    return await this.arimilService.getPostById(id);
  }

  @Get('posts/user/:id')
  async getPostsByUserId(@Param('id') id: string) {
    return await this.arimilService.getPostsByUserId(id);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string) {
    return await this.arimilService.deletePost(id);
  }

  @Post('posts')
  async createPost(@Body() post: CreatePostDTO) {
    return await this.arimilService.createPost(post);
  }

  // ! Usuarios
  @Get('users')
  async getUsers() {
    return await this.arimilService.getUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return await this.arimilService.getUserById(id);
  }

  @Get('users/login/:usernameOrEmail/:password')
  async login(
    @Param('usernameOrEmail') usernameOrEmail: string,
    @Param('password') password: string,
  ) {
    return await this.arimilService.login(usernameOrEmail, password);
  }

  @Post('users')
  async createUser(@Body() user: CreateUserDTO) {
    return await this.arimilService.createUser(user);
  }

  @Post('users/like')
  async toggleLike(@Body() like: ToggleLikeDTO) {
    return await this.arimilService.toggleLikePost(like);
  }
}
