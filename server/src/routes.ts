import express from 'express';

import { PrimaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-respository';
import { SubmitFeedbacksUseCase } from './use-cases/submit-feedbacks-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

const routes = express.Router();

routes.post(
  '/feedbacks',
  async (req: express.Request, res: express.Response) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new PrimaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbacksUseCase = new SubmitFeedbacksUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbacksUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  }
);

export default routes;
