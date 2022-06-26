import {toast} from 'react-toastify';

import supabase from '~/lib/supabase';

const uploadImage = async (files: FileList): Promise<string | null> => {
  const imageFile = files[0];
  const imageFileName = imageFile.name.split(' ').join('');

  const {publicURL} = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
    .getPublicUrl(imageFileName);

  if (publicURL) {
    return publicURL;
  }

  const {data, error} = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
    .upload(imageFileName, imageFile, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    toast.error(error.message);

    return null;
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.Key}`;
};

export default uploadImage;
