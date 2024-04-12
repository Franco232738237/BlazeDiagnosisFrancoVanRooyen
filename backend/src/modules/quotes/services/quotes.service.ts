import { createAuditTimestamps, nextEntityId } from '../../../shared/store/in-memory-db';
import { createToken } from '../../../shared/utils/id';
import type { CreateQuoteDto } from '../dto/quotes.dto';
import type { QuoteEntity } from '../entities/quote.entity';
import { QuotesRepository } from '../repositories/quotes.repository';

export class QuotesService {
  constructor(private readonly repository = new QuotesRepository()) {}

  listByJob(jobId: string) {
    return this.repository.listByJob(jobId).map((quote) => ({
      ...quote,
      lines: this.repository.listLines(quote.id),
    }));
  }

  getPublicQuote(token: string) {
    const quote = this.repository.findByToken(token);
    if (!quote) {
      throw new Error('Quote not found.');
    }

    return {
      ...quote,
      lines: this.repository.listLines(quote.id),
    };
  }

  create(input: CreateQuoteDto) {
    const subtotal = input.lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
    const discountAmount = input.discountAmount ?? 0;
    const taxAmount = Number((((subtotal - discountAmount) * (input.taxRate ?? 0.15))).toFixed(2));
    const total = Number((subtotal - discountAmount + taxAmount).toFixed(2));

    const version = this.repository.listByJob(input.jobId).length + 1;
    const quote: QuoteEntity = this.repository.create({
      id: nextEntityId('quote'),
      ...createAuditTimestamps(),
      tenantId: input.tenantId,
      jobId: input.jobId,
      version,
      status: 'DRAFT',
      subtotal,
      taxAmount,
      discountAmount,
      total,
      publicToken: createToken('quote'),
    });

    this.repository.createLines(
      input.lines.map((line) => ({
        id: nextEntityId('ql'),
        quoteId: quote.id,
        type: line.type,
        description: line.description,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        total: Number((line.quantity * line.unitPrice).toFixed(2)),
      }))
    );

    return {
      ...quote,
      lines: this.repository.listLines(quote.id),
    };
  }

  markSent(id: string) {
    return this.repository.update(id, { status: 'SENT' });
  }

  approveByToken(token: string) {
    const quote = this.repository.findByToken(token);
    if (!quote) {
      throw new Error('Quote not found.');
    }

    return this.repository.update(quote.id, { status: 'APPROVED', approvedAt: new Date() });
  }

  rejectByToken(token: string) {
    const quote = this.repository.findByToken(token);
    if (!quote) {
      throw new Error('Quote not found.');
    }

    return this.repository.update(quote.id, { status: 'REJECTED', rejectedAt: new Date() });
  }
}
