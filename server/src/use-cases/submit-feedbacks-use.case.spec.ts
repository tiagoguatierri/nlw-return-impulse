import { SubmitFeedbacksUseCase } from './submit-feedbacks-use-case';

describe('Submit feddback', () => {
  //spies = espiões

  const createFeedbacksSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeebacks = new SubmitFeedbacksUseCase(
    { create: createFeedbacksSpy },
    { sendMail: sendMailSpy }
  );
  it('should be able to submit a feebback', async () => {
    await expect(
      submitFeebacks.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64:....',
      })
    ).resolves.not.toThrow();

    expect(createFeedbacksSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeebacks.execute({
        type: '',
        comment: 'Example comment',
        screenshot: 'data:image/png;base64:....',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeebacks.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64:....',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeebacks.execute({
        type: 'BUG',
        comment: 'Example comment',
        screenshot: 'test.jpg',
      })
    ).rejects.toThrow();
  });
});
