import {IEvaluationTag} from '..';

export interface IEvaluation {
  id: number;
  readonly filename: string;
  readonly data: Record<string, any>;
  readonly evaluationTags: IEvaluationTag[] | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
