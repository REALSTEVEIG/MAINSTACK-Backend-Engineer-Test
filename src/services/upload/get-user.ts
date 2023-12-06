import { generateSasToken } from '../../utils/common';

export const getProfilePictureSasToken = async (
  userId: string,
): Promise<string | null> => {
  const blobName = userId;

  return generateSasToken(blobName);
};
