import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ApiKey} from '../apikeys/apikey.model';
import {ApiKeyService} from '../apikeys/apikey.service';
import {AuthnModule} from '../authn/authn.module';
import {AuthnService} from '../authn/authn.service';
import {ConfigService} from '../config/config.service';
import {DatabaseService} from '../database/database.service';
import {EvaluationTag} from '../evaluation-tags/evaluation-tag.model';
import {EvaluationTagsService} from '../evaluation-tags/evaluation-tags.service';
import {Evaluation} from '../evaluations/evaluation.model';
import {EvaluationsService} from '../evaluations/evaluations.service';
import {Group} from '../groups/group.model';
import {GroupsService} from '../groups/groups.service';
import {TokenModule} from '../token/token.module';
import {User} from '../users/user.model';
import {UsersService} from '../users/users.service';
import {StatisticsController} from './statistics.controller';
import {StatisticsService} from './statistics.service';

@Module({
  imports: [
    AuthnModule,
    SequelizeModule.forFeature([
      ApiKey,
      Evaluation,
      EvaluationTag,
      User,
      Group
    ]),
    TokenModule
  ],
  providers: [
    AuthnService,
    StatisticsService,
    ApiKeyService,
    ConfigService,
    DatabaseService,
    EvaluationsService,
    EvaluationTagsService,
    UsersService,
    GroupsService
  ],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
