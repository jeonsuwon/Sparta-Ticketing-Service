  import Joi from 'joi';
  import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

  import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
  import { AuthMiddleware } from './auth/auth.middleware';
  import { User } from './user/entities/user.entity';
  import { Show } from './show/entities/show.entity';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
  import { AuthModule } from './auth/auth.module';
  import { UserModule } from './user/user.module';
  import { ShowModule } from './show/show.module';

  const typeOrmModuleOptions = {
    useFactory: async (
      configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => ({
      namingStrategy: new SnakeNamingStrategy(),
      type: 'mysql',
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      database: configService.get('DB_NAME'),
      entities: [User,Show],
      synchronize: configService.get('DB_SYNC'),
      logging: true,
    }),
    inject: [ConfigService],
  };

  @Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          JWT_SECRET_KEY: Joi.string().required(),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().required(),
          DB_HOST: Joi.string().required(),
          DB_PORT: Joi.number().required(),
          DB_NAME: Joi.string().required(),
          DB_SYNC: Joi.boolean().required(),
        }),
      }),
      TypeOrmModule.forRootAsync(typeOrmModuleOptions),
      AuthModule,
      UserModule,
      ShowModule,
    ],
    controllers: [],
    providers: [],
  })
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
      consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'user/check', method: RequestMethod.GET},
        {path: 'show', method: RequestMethod.POST},
        {path: 'show', method: RequestMethod.PATCH},
        {path: 'show', method: RequestMethod.DELETE},
      );// user/check 엔드포인트에만 적용?
    }
  }