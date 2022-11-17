import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { assertObjectId } from 'src/utilities/mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll(): Promise<Post[]> {
    return this.postModel.find({ deletedAt:null }).exec();
  }

  async findOne(id: string): Promise<Post> {
    assertObjectId(id);
    return this.postModel.findById({ _id: id }).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    assertObjectId(id);

    const post = await this.postModel.findByIdAndUpdate(
      id, 
      {...updatePostDto, 
        updatedAt: Date.now(),
      },
      { new: true },
      );
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
    // const post = await this.postModel.findById(id);

    // if (!post) {
    //   throw new HttpException(`Post #${id} not found`, HttpStatus.NOT_FOUND);
    // }

    // await post.update({ _id: id}, {
    //   $set: {
    //     ...updatePostDto,
    //     updatedAt: Date.now(),
    //   }
    // })
    // return post.save;
  }

  async remove(id: string) {

    const post = await this.postModel.findByIdAndUpdate(
      id,
      {
        deletedAt: Date.now(),
      },
      { new: true },
    );

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return `This action removes a #${id} post`;
  }
}
