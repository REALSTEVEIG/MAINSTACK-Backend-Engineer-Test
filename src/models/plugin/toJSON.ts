/* eslint-disable */
import { type Document } from 'mongoose';

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v,  and any path that has private: true
 *  - replaces _id with id
 *  - ensures id comes first
 */

const deleteAtPath = (obj: any, path: any, index: number) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

export const toJSON = (schema: any) => {
  let transform: Function;
  if (schema.options.toJSON?.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc: Document, ret: any, options: Record<string, any>) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options?.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.password;
      delete ret.__v;

      // Ensure id comes first
      const orderedRet = { id: ret.id, ...ret };

      if (transform) {
        return transform(doc, orderedRet, options);
      }

      return orderedRet;
    },
  });
};
