import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Car from '../models/car';
import FileRepository from './fileRepository';

class CarRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Car(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        }
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Car(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Car(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(
          options,
        ).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);



    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Car(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Car(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );


  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Car(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    return MongooseRepository.wrapWithSessionIfExists(
      Car(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Car(options.database)
        .findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: any = [];
    
    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.name) {
        criteriaAnd.push({
          name: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.name,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.seatsRange) {
        const [start, end] = filter.seatsRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            seats: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            seats: {
              $lte: end,
            },
          });
        }
      }

      if (filter.carType) {
        criteriaAnd.push({
          carType: { $all: filter.carType },
        });
      }

      if (filter.transmission) {
        criteriaAnd.push({
          transmission: { $all: filter.transmission },
        });
      }

      if (filter.deliveryType) {
        criteriaAnd.push({
          deliveryType: { $all: filter.deliveryType },
        });
      }

      if (filter.note) {
        criteriaAnd.push({
          note: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.note,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.brand) {
        criteriaAnd.push({
          brand: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.brand,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            price: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            price: {
              $lte: end,
            },
          });
        }
      }

      if (filter.countInStockRange) {
        const [start, end] = filter.countInStockRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            countInStock: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            countInStock: {
              $lte: end,
            },
          });
        }
      }

      if (filter.ratingRange) {
        const [start, end] = filter.ratingRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            rating: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            rating: {
              $lte: end,
            },
          });
        }
      }

      if (filter.numReviewsRange) {
        const [start, end] = filter.numReviewsRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            numReviews: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            numReviews: {
              $lte: end,
            },
          });
        }
      }

      if (filter.fuelType) {
        criteriaAnd.push({
          fuelType: { $all: filter.fuelType },
        });
      }

      if (filter.locations) {
        criteriaAnd.push({
          locations: { $all: filter.locations },
        });
      }

      if (filter.freeKmsRange) {
        const [start, end] = filter.freeKmsRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            freeKms: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            freeKms: {
              $lte: end,
            },
          });
        }
      }

      if (filter.deliveryChargesRange) {
        const [start, end] = filter.deliveryChargesRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            deliveryCharges: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            deliveryCharges: {
              $lte: end,
            },
          });
        }
      }

      if (filter.bookedTimeSlotsFromRange) {
        const [start, end] = filter.bookedTimeSlotsFromRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            bookedTimeSlotsFrom: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            bookedTimeSlotsFrom: {
              $lte: end,
            },
          });
        }
      }

      if (filter.bookedTimeSlotsToRange) {
        const [start, end] = filter.bookedTimeSlotsToRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            bookedTimeSlotsTo: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            bookedTimeSlotsTo: {
              $lte: end,
            },
          });
        }
      }

      if (filter.rentPerHourRange) {
        const [start, end] = filter.rentPerHourRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            rentPerHour: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            rentPerHour: {
              $lte: end,
            },
          });
        }
      }

      if (filter.capacityRange) {
        const [start, end] = filter.capacityRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            capacity: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            capacity: {
              $lte: end,
            },
          });
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await Car(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await Car(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(this._mapRelationshipsAndFillDownloadUrl),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: Array<any> = [{
      tenant: currentTenant.id,
    }];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('id_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Car(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Car(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.image = await FileRepository.fillDownloadUrl(
      output.image,
    );



    return output;
  }
}

export default CarRepository;
