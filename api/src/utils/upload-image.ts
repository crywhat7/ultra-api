import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_RESPONSE } from './storage-response';
import { SupabaseClient } from '@supabase/supabase-js';

export class UploadImages {
  constructor(private supabase: SupabaseClient<any, 'public', any>) {}

  public async uploadImageBase64({
    base64,
    bucket,
    folder,
  }: {
    base64: string;
    bucket: BUCKETS;
    folder: FOLDERS;
  }) {
    const [, base64Image] = base64.split(',');
    const ArrayBufferImage = decode(base64Image);
    const uuid = uuidv4();

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(`${folder}/${uuid}.jpeg`, ArrayBufferImage, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    console.log({ data });

    if (error) {
      throw new Error(error.message);
    }

    return data as IResponse;
  }
}

export enum BUCKETS {
  IS2_BUCKET = 'is_documents_and_files',
  ATM = 'atm',
}

export enum FOLDERS {
  TICKETS = 'tickets_images',
  EMPLEADOS = 'empleados',
}

export interface IResponse {
  path: string;
  id: string;
  fullPath: string;
}
