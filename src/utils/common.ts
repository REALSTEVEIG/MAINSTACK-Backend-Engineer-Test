import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  SASProtocol,
  BlobSASPermissions,
  ContainerClient,
} from '@azure/storage-blob';

import azureStorageConfig from '@config/blob';

export const generateSasToken = async (
  blobName: string,
): Promise<string | null> => {
  const { ACCOUNT, ACCOUNT_KEY, CONTAINER_NAME } = azureStorageConfig;
  const sharedKeyCredential = new StorageSharedKeyCredential(
    ACCOUNT,
    ACCOUNT_KEY,
  );
  const containerName = CONTAINER_NAME;

  const serviceURL = `https://${ACCOUNT}.blob.core.windows.net`;
  const containerURL = `${serviceURL}/${containerName}`;
  const blobURL = `${containerURL}/${blobName}`;

  // Get a reference to the blob
  const containerClient = new ContainerClient(
    `https://${ACCOUNT}.blob.core.windows.net/${containerName}`,
    sharedKeyCredential,
  );
  const blobClient = containerClient.getBlobClient(blobName);

  // Check if the blob exists
  const blobExists = await blobClient.exists();

  if (!blobExists) {
    return null;
  }

  const blobSAS = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse('r'),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000), // SAS token valid for 24 hours
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential,
  );

  const sasToken = blobSAS.toString();

  return `${blobURL}?${sasToken}`;
};
