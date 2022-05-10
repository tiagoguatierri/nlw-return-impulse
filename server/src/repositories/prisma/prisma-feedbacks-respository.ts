import { FeddbackCreateData, FeedbacksRepository } from '../feedbacks-respository';
import prisma from '../../prisma';

export class PrimaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeddbackCreateData) {
    const data = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
