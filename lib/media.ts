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
// Modified version with error handling and validation
export const uploadScreenshot = async (
  url: string,
  s3Key: string
): Promise<string> => {
  if (!url) throw new Error("URL is required");
  if (!s3Key) throw new Error("S3 key is required");
  if (!env.SCREENSHOTONE_ACCESS_KEY)
    throw new Error("SCREENSHOTONE_ACCESS_KEY is required");

  const queryParams = new URLSearchParams({
    url,
    access_key: env.SCREENSHOTONE_ACCESS_KEY,
    response_type: "json",

    // Cache settings
    cache: "true",
    cache_ttl: "14400",

    // Enhanced waiting strategy for dynamic content
    delay: "5", // Increased delay to 5 seconds
    wait_until: "networkidle0", // Wait until network is idle
    timeout: "30", // 30 second timeout

    // Viewport and quality settings
    format: "webp",
    viewport_width: "1280",
    viewport_height: "720",
    device_scale_factor: "1",
    quality: "100",

    // Better handling of modern web features
    block_ads: "true",
    block_trackers: "true",
    block_cookies: "true",
    fail_on_page_error: "false", // Don't fail on JS errors
    scroll_to_bottom: "true", // Ensure full page load

    // S3 storage options
    store: "true",
    storage_path: s3Key,
    storage_bucket: env.S3_BUCKET,
    storage_access_key_id: env.S3_ACCESS_KEY,
    storage_secret_access_key: env.S3_SECRET_ACCESS_KEY,
    storage_region: "us-east-1", // Added explicit region
    storage_return_location: "true",
  });

  try {
    const endpointUrl = `https://api.screenshotone.com/take?${queryParams.toString()}`;

    // Add retries for resilience
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await wretch(endpointUrl)
          .get()
          .json<{ store: { location: string } }>();

        if (response.store?.location) {
          return response.store.location;
        }
        throw new Error("Invalid response format");
      } catch (err) {
        attempts++;
        if (attempts === maxAttempts) throw err;
        // Wait 2 seconds before retry
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    throw new Error("Max retry attempts reached");
  } catch (error: any) {
    console.error("Screenshot error:", {
      message: error.message,
      status: error?.status,
      response: error?.response,
    });
    throw error;
  }
};
