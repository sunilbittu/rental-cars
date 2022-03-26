import { CustomerModel } from 'src/app/customer/customer-model';

const { fields } = CustomerModel;

export default [
  fields.id,
  fields.name,
  fields.email,
  fields.password,
  fields.phone,
  fields.gender,
  fields.location,
  fields.isAdmin,
  fields.createdAt,
  fields.updatedAt,
];
