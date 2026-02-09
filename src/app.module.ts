import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';
import { TaxonomyModule } from './taxonomy/taxonomy.module';
import { VenueModule } from './venue/venue.module';
import { DishModule } from './dish/dish.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TaxonomyModule,
    VenueModule,
    DishModule,
    RecommendationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    if (this.connection.readyState === ConnectionStates.connected) {
      console.log('✅ MongoDB Atlas đã kết nối thành công!');
    } else {
      console.log(
        '❌ MongoDB Atlas chưa sẵn sàng. Trạng thái:',
        this.connection.readyState,
      );
    }
  }
}
