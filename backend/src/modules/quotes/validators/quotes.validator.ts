import { assertRequiredString, isObject } from '../../../shared/utils/validation';
import type { CreateQuoteDto, QuoteLineDto } from '../dto/quotes.dto';

function validateQuoteLine(line: unknown): QuoteLineDto {
  if (!isObject(line)) {
    throw new Error('Quote line must be an object.');
  }

  if (line.type !== 'LABOR' && line.type !== 'PART') {
    throw new Error('Quote line type must be LABOR or PART.');
  }

  if (typeof line.quantity !== 'number' || typeof line.unitPrice !== 'number') {
    throw new Error('Quote line quantity and unitPrice must be numeric.');
  }

  return {
    type: line.type,
    description: assertRequiredString(line.description, 'description'),
    quantity: line.quantity,
    unitPrice: line.unitPrice,
  };
}

export function validateCreateQuoteInput(input: unknown): CreateQuoteDto {
  if (!isObject(input)) {
    throw new Error('Quote payload is required.');
  }

  const rawLines = input.lines;
  if (!Array.isArray(rawLines) || rawLines.length === 0) {
    throw new Error('At least one quote line is required.');
  }

  return {
    tenantId: assertRequiredString(input.tenantId, 'tenantId'),
    jobId: assertRequiredString(input.jobId, 'jobId'),
    discountAmount: typeof input.discountAmount === 'number' ? input.discountAmount : 0,
    taxRate: typeof input.taxRate === 'number' ? input.taxRate : 0.15,
    lines: rawLines.map(validateQuoteLine),
  };
}
