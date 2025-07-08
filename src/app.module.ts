import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LibraryModule } from './library/library.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB ??
        (() => {
          throw new Error('MONGODB environment variable is not defined');
        })(),
      {
        connectionFactory: (connection) => {
          console.log('MongoDB connection established successfully');
          return connection;
        },
      },
    ),
    LibraryModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
