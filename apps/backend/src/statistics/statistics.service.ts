import {Injectable} from '@nestjs/common';
import {EvaluationTagsService} from '../evaluation-tags/evaluation-tags.service';
import {EvaluationsService} from '../evaluations/evaluations.service';
import {GroupsService} from '../groups/groups.service';
import {UsersService} from '../users/users.service';
import {StatisticsDTO} from './dto/statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly evaluationsService: EvaluationsService,
    private readonly evaluationTagsService: EvaluationTagsService,
    private readonly groupsService: GroupsService,
    private readonly usersService: UsersService
  ) {}

  async getHeimdallStatistics(): Promise<StatisticsDTO> {
    return new StatisticsDTO({
      userCount: await this.usersService.count(),
      evaluationCount: await this.evaluationsService.count(),
      evaluationTagCount: await this.evaluationTagsService.count(),
      userGroupCount: await this.groupsService.count()
    });
  }
}
