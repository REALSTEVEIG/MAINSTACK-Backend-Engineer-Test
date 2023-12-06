import {
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import azureStorageConfig from '@config/blob';
import { generateSasToken } from '../../utils/common';

export const uploadFile = async (
  file: Express.Multer.File,
  userId: string,
): Promise<string | null> => {
  const { ACCOUNT, ACCOUNT_KEY, CONTAINER_NAME } = azureStorageConfig;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    ACCOUNT,
    ACCOUNT_KEY,
  );
  const containerName = CONTAINER_NAME;

  // Container and blob names
  const blobName = userId;
  const account = ACCOUNT;

  // Create a container client
  const containerClient = new ContainerClient(
    `https://${account}.blob.core.windows.net/${containerName}`,
    sharedKeyCredential,
  );

  await containerClient.exists();
  const blobClient = containerClient.getBlobClient(blobName);
  const blockBlobClient = blobClient.getBlockBlobClient();

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });

  const sasToken = await generateSasToken(blobName);

  return sasToken;
};
