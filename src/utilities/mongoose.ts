import { Types } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export function assertObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
    }
}