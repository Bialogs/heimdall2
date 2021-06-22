import {Request} from 'express';
import winston from 'winston';
import {EvaluationTagDto} from '../evaluation-tags/dto/evaluation-tag.dto';
import {EvaluationDto} from '../evaluations/dto/evaluation.dto';
import {Evaluation} from '../evaluations/evaluation.model';
import {GroupDto} from '../groups/dto/group.dto';
import {SlimUserDto} from '../users/dto/slim-user.dto';
import {UserDto} from '../users/dto/user.dto';
import {User} from '../users/user.model';

export class LoggingService {
  public logger = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
      }),
      winston.format.printf(
        (info) => `[${[info.timestamp]} ${info.ip}] ${info.message}`
      )
    )
  });

  // Actions involving evaluations
  logEvaluationAction(
    request: Request & {user: User},
    action: string,
    evaluation: EvaluationDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action}: ${this.evaluationToString(evaluation)}`
    });
  }

  evaluationToString(evaluation: Evaluation | EvaluationDto): string {
    return `Evaluation<ID: ${evaluation.id} | Filename: ${evaluation.filename}>`;
  }

  // Actions involving evaluation tags
  logEvaluationTagAction(
    request: Request & {user: User},
    action: string,
    tag: EvaluationTagDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action}: ${this.evaluationTagToString(tag)}`
    });
  }

  evaluationTagToString(tag: EvaluationTagDto): string {
    return `EvaluationTag<ID: ${tag.id} | Value: ${tag.value}>`;
  }

  evaluationTagsToString(tags: EvaluationTagDto[]): string {
    return `EvaluationTags[${tags
      .map((tag) => this.evaluationTagToString(tag))
      .join(', ')}]`;
  }

  // Actions involving groups
  logGroupAction(
    request: Request & {user: User},
    action: string,
    group: GroupDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action}: ${this.groupToStringWithUsers(group)}`
    });
  }

  logGroupActionWithEvaluationSubject(
    request: Request & {user: User},
    action: string,
    subject: Evaluation | EvaluationDto,
    group: GroupDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action} ${this.evaluationToString(subject)} -> ${this.groupToString(
        group
      )}`
    });
  }

  logGroupActionWithUserSubject(
    request: Request & {user: User},
    action: string,
    subject: User,
    group: GroupDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action} ${this.userToString(subject)} -> ${this.groupToString(
        group
      )}`
    });
  }

  groupToString(group: GroupDto): string {
    return `Group<ID: ${group.id} | Name: ${group.name}>`;
  }

  groupToStringWithUsers(group: GroupDto): string {
    return `Group<ID: ${group.id} | Name: ${group.name} | Users[${group.users
      .map((user) => this.userToString(user))
      .join(', ')}]>`;
  }

  // Actions involving authentication
  logAuthenticationAction(request: Request, action: string, user?: User): void {
    this.logger.info({
      ip: request.ip,
      message: `${action}: ${this.userToString(user)}`
    });
  }

  // Actions involving users
  logUserAction(
    request: Request & {user?: User},
    action: string,
    subject: User | UserDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action}: ${this.userToString(subject)}`
    });
  }

  logAuthenticatedUserAction(
    request: Request & {user: User},
    action: string,
    subject: User | UserDto
  ): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(
        request.user
      )}: ${action}: ${this.userToString(subject)}`
    });
  }

  userToString(user?: User | UserDto | SlimUserDto): string {
    if (user) {
      if ('organization' in user && user.organization && user.title) {
        return `User<ID: ${user.id} | Name: ${user.lastName}, ${user?.firstName} | Organization: ${user.organization} (${user.title})>`;
      } else if ('organization' in user && user.organization) {
        return `User<ID: ${user.id} | Name: ${user.lastName}, ${user?.firstName} | Organization: ${user.organization}>`;
      }
      return `User<ID: ${user.id} | Name: ${user.lastName}, ${user?.firstName}>`;
    }
    return `User<Unknown>`;
  }

  // Actions that don't pertain to any specific controller

  logAction(request: Request & {user: User}, action: string): void {
    this.logger.info({
      ip: request.ip,
      message: `${this.userToString(request.user)}: ${action}`
    });
  }
}
