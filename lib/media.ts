import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { stripURLSubpath } from "@curiousleaf/utils";
import wretch from "wretch";
import { env } from "~/env";
import { s3Client } from "~/services/s3";

/**
 * Uploads a file to S3 and returns the S3 location.
 * @param file - The file to upload.
 * @param key - The S3 key to upload the file to.
 * @returns The S3 location of the uploaded file.
 */
export const uploadToS3Storage = async (file: Buffer, key: string) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: file,
      StorageClass: "STANDARD",
    },
    queueSize: 4,
    partSize: 1024 * 1024 * 5,
    leavePartsOnError: false,
  });

  const result = await upload.done();

  if (!result.Location) {
    throw new Error("Failed to upload");
  }

  return `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${result.Key}`;
};

/**
 * Removes a directory from S3.
 * @param directory - The directory to remove.
 */
export const removeS3Directory = async (directory: string) => {
  const listCommand = new ListObjectsV2Command({
    Bucket: env.S3_BUCKET,
    Prefix: `${directory}/`,
  });

  let continuationToken: string | undefined;

  do {
    const listResponse = await s3Client.send(listCommand);
    for (const object of listResponse.Contents || []) {
      if (object.Key) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: env.S3_BUCKET,
          Key: object.Key,
        });
        await s3Client.send(deleteCommand);
      }
    }
    continuationToken = listResponse.NextContinuationToken;
    listCommand.input.ContinuationToken = continuationToken;
  } while (continuationToken);
};

/**
 * Uploads a favicon to S3 and returns the S3 location.
 * @param url - The URL of the website to fetch the favicon from.
 * @param s3Key - The S3 key to upload the favicon to.
 * @returns The S3 location of the uploaded favicon.
 */
export const uploadFavicon = async (
  url: string,
  s3Key: string
): Promise<string> => {
  const cleanedUrl = encodeURIComponent(stripURLSubpath(url) ?? "");
  const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain_url=${cleanedUrl}`;

  try {
    const arrayBuffer = await wretch(faviconUrl)
      .get()
      .badRequest((err) => {
        throw new Error(`Failed to fetch favicon: ${err.message}`);
      })
      .arrayBuffer();

    // Convert response to Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    const s3Location = await uploadToS3Storage(buffer, `${s3Key}.png`);

    return s3Location;
  } catch (error) {
    console.error("Error fetching or uploading favicon:", error);
    throw error;
  }
};

/**
 * Uploads a screenshot to S3 and returns the S3 location.
 * @param url - The URL of the website to fetch the screenshot from.
 * @param s3Key - The S3 key to upload the screenshot to.
 * @returns The S3 location of the uploaded screenshot.
 */

/**
 * Uploads a screenshot of a given URL to an S3 bucket using ScreenshotOne API.
 *
/**
 * Uploads a screenshot of a given URL to an S3 bucket using ScreenshotOne API.
 *
 * @param {string} url - The URL of the webpage to capture.
 * @param {string} s3Key - The key (path) to store the screenshot in S3.
 * @returns {Promise<string>} - The location of the stored screenshot.
 */
export const uploadScreenshot = async (
  url: string,
  s3Key: string
): Promise<string> => {
  // Construct the ScreenshotOne API URL
  const screenshotOneApiUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(
    url
  )}&full_page=true&format=png&key=${env.SCREENSHOTONE_ACCESS_KEY}`;

  try {
    // Fetch the screenshot from ScreenshotOne API
    const arrayBuffer = await wretch(screenshotOneApiUrl)
      .get()
      .badRequest((err) => {
        throw new Error(`Failed to fetch screenshot: ${err.message}`);
      })
      .arrayBuffer();

    // Convert response to Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    const s3Location = await uploadToS3Storage(buffer, `${s3Key}.png`);

    return s3Location;
  } catch (error) {
    console.error("Error fetching or uploading screenshot:", error);
    throw error;
  }
};
