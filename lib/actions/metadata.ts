"use server"

import OpenGraphScraper from "open-graph-scraper"
import { DEFAULT_METADATA_ERROR_MESSAGE, getDomainFromUrl } from "../helper"

// For scraping the metadata/details of entered URL.
export const getURLMetadata = async (url: string) => {
  const { error, result } = await OpenGraphScraper({ url })

  if (error) {
    throw new Error("Data cannot be fetched");
  }

  if (!result.success) {
    throw new Error(DEFAULT_METADATA_ERROR_MESSAGE)
  }

  if (result.ogImage && result.ogTitle && result.ogDescription) {
    return {
      previewImageUrl: result.ogImage[0].url,
      title: result.ogTitle,
      description: result.ogDescription,
      domain: getDomainFromUrl(url)
    }
  }

  throw new Error(DEFAULT_METADATA_ERROR_MESSAGE)
}