import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('booking');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const BookingSchema = new Schema(
    {
      car: {
        type: String,
      },
      bookedTimeSlotsFrom: {
        type: Date,
      },
      bookedTimeSlotsTo: {
        type: Date,
      },
      totalHours: {
        type: Number,
      },
      totalAmount: {
        type: Number,
      },
      transactionId: {
        type: String,
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

  BookingSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  BookingSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  BookingSchema.set('toJSON', {
    getters: true,
  });

  BookingSchema.set('toObject', {
    getters: true,
  });

  return database.model('booking', BookingSchema);
};
