import { Module } from '@nestjs/common';
import { ProductReview } from './entities/productReview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewsService } from './productReviews.service';
import { ProductReviewsResolver } from './productReviews.resolver';
import { ProductTransactionsModule } from '../productTransactions/productTransactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview]), ProductTransactionsModule],
  providers: [ProductReviewsResolver, ProductReviewsService],
})
export class ProductReviewsModule {}
