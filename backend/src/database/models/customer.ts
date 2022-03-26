import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('customer');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CustomerSchema = new Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      phone: {
        type: String,
      },
      gender: [{
        type: String  
      }],
      location: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  CustomerSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CustomerSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CustomerSchema.set('toJSON', {
    getters: true,
  });

  CustomerSchema.set('toObject', {
    getters: true,
  });

  return database.model('customer', CustomerSchema);
};
