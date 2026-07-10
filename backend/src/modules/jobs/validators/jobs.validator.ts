import { CreateJobDto } from '../dto/jobs.dto';

export function validateCreateJob(input: CreateJobDto) {

  if (!input.customerId) {

    throw new Error('Customer is required.');

  }

  if (!input.vehicleId) {

    throw new Error('Vehicle is required.');

  }

  if (!input.customerComplaint) {

    throw new Error('Complaint is required.');

  }

}
