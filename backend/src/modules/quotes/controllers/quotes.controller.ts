import { ok } from '../../../shared/utils/response';
import { QuotesService } from '../services/quotes.service';
import { validateCreateQuoteInput } from '../validators/quotes.validator';

export class QuotesController {
  constructor(private readonly service = new QuotesService()) {}

  listByJob(jobId: string) {
    return ok(this.service.listByJob(jobId));
  }

  create(payload: unknown) {
    return ok(this.service.create(validateCreateQuoteInput(payload)));
  }

  markSent(id: string) {
    return ok(this.service.markSent(id));
  }

  getPublicQuote(token: string) {
    return ok(this.service.getPublicQuote(token));
  }

  approve(token: string) {
    return ok(this.service.approveByToken(token));
  }

  reject(token: string) {
    return ok(this.service.rejectByToken(token));
  }
}
