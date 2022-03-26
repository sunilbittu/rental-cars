import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('order');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const OrderSchema = new Schema(
    {
      carId: {
        type: String,
      },
      bookingAmount: {
        type: Number,
      },
      shippingAddress: {
        type: String,
      },
      paymentMethod: [{
        type: String  
      }],
      deliveryAddress: {
        type: String,
      },
      pickupTime: {
        type: Date,
      },
      deliveryTime: {
        type: Date,
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

  OrderSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  OrderSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  OrderSchema.set('toJSON', {
    getters: true,
  });

  OrderSchema.set('toObject', {
    getters: true,
  });

  return database.model('order', OrderSchema);
};
