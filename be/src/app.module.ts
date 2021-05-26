import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './note/note.module';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';
import { BundleModule } from './bundle/bundle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_IP,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true,
    }),
    CategoryModule,
    NoteModule,
    ItemModule,
    UserModule,
    BundleModule,
  ],
  exports: [NoteModule, ItemModule],
  controllers: [AppController],
})
export class AppModule {}
