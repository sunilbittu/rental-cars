import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('car');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CarSchema = new Schema(
    {
      name: {
        type: String,
      },
      image: [FileSchema],
      seats: {
        type: Number,
      },
      carType: [{
        type: String  
      }],
      transmission: [{
        type: String  
      }],
      deliveryType: [{
        type: String  
      }],
      note: {
        type: String,
      },
      brand: {
        type: String,
      },
      price: {
        type: Number,
      },
      countInStock: {
        type: Number,
      },
      rating: {
        type: Number,
      },
      numReviews: {
        type: Number,
      },
      fuelType: [{
        type: String  
      }],
      locations: [{
        type: String  
      }],
      freeKms: {
        type: Number,
      },
      deliveryCharges: {
        type: Number,
      },
      bookedTimeSlotsFrom: {
        type: Date,
      },
      bookedTimeSlotsTo: {
        type: Date,
      },
      rentPerHour: {
        type: Number,
      },
      capacity: {
        type: Number,
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

  CarSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CarSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CarSchema.set('toJSON', {
    getters: true,
  });

  CarSchema.set('toObject', {
    getters: true,
  });

  return database.model('car', CarSchema);
};
