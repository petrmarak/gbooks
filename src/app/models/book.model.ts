interface IndustryIdentifier {
    type?: string;
    identifier?: string;
}

interface Dimensions {
    height?: string;
    width?: string;
    thickness?: string;
}

interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
}

interface VolumeInfo {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: IndustryIdentifier[];
    pageCount?: number;
    dimensions?: Dimensions;
    printType?: string;
    mainCategory?: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    contentVersion?: string;
    imageLinks?: ImageLinks;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
}

interface ListPrice {
    amount?: number;
    currencyCode?: string;
}

interface RetailPrice {
    amount?: number;
    currencyCode?: string;
}

interface SaleInfo {
    country?: string;
    saleability?: string;
    onSaleDate?: Date;
    isEbook?: boolean;
    listPrice?: ListPrice;
    retailPrice?: RetailPrice;
    buyLink?: string;
}

interface Epub {
    isAvailable?: boolean;
    downloadLink?: string;
    acsTokenLink?: string;
}

interface Pdf {
    isAvailable?: boolean;
    downloadLink?: string;
    acsTokenLink?: string;
}

interface DownloadAccess {
    kind?: string;
    volumeId?: string;
    restricted?: boolean;
    deviceAllowed?: boolean;
    justAcquired?: boolean;
    maxDownloadDevices?: number;
    downloadsAcquired?: number;
    nonce?: string;
    source?: string;
    reasonCode?: string;
    message?: string;
    signature?: string;
}

interface AccessInfo {
    country?: string;
    viewability?: string;
    embeddable?: boolean;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: Epub;
    pdf?: Pdf;
    webReaderLink?: string;
    accessViewStatus?: string;
    downloadAccess?: DownloadAccess;
}

interface SearchInfo {
    textSnippet?: string;
}

export interface BookVolume {
    kind?: string;
    id?: string;
    etag?: string;
    selfLink?: string;
    volumeInfo?: VolumeInfo;
    saleInfo?: SaleInfo;
    accessInfo?: AccessInfo;
    searchInfo?: SearchInfo;
}

// export default BookVolume;