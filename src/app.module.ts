import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductCategoriesModule } from './apis/productCategories/productCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { FilesModule } from './apis/files/files.module';
import { FavoritesModule } from './apis/favorites/favorites.module';
import { ProductReviewsModule } from './apis/productReviews/productReviews.module';
import { ProductCartsModule } from './apis/productCarts/productCarts.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    FavoritesModule,
    FilesModule,
    ProductsModule,
    ProductCartsModule,
    ProductReviewsModule,
    UsersModule,
    ProductCategoriesModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      // resolvers: { JSON: GraphQLJSON },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class AppModule {}
