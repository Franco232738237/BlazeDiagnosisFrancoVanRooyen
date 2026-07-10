import { db, type QuoteLineRecord } from '../../../shared/store/in-memory-db';
import type { QuoteEntity } from '../entities/quote.entity';

export class QuotesRepository {
  listByJob(jobId: string): QuoteEntity[] {
    return db.quotes.filter((quote) => quote.jobId === jobId);
  }

  findById(id: string): QuoteEntity | undefined {
    return db.quotes.find((quote) => quote.id === id);
  }

  findByToken(publicToken: string): QuoteEntity | undefined {
    return db.quotes.find((quote) => quote.publicToken === publicToken);
  }

  create(quote: QuoteEntity): QuoteEntity {
    db.quotes.push(quote);
    return quote;
  }

  createLines(lines: QuoteLineRecord[]) {
    db.quoteLines.push(...lines);
    return lines;
  }

  listLines(quoteId: string): QuoteLineRecord[] {
    return db.quoteLines.filter((line) => line.quoteId === quoteId);
  }

  update(id: string, updates: Partial<QuoteEntity>): QuoteEntity {
    const quote = this.findById(id);
    if (!quote) {
      throw new Error('Quote not found.');
    }

    Object.assign(quote, updates, { updatedAt: new Date() });
    return quote;
  }
}
