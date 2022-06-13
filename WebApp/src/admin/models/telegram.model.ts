export interface GetTelegramTokenResponse {
    token: string;
}

export interface TelegramStatus {
    tokenIsValid: boolean;
    error: string;
    webHookInfo: WebhookInfo;
}

export interface WebhookInfo {
    url: string;
    hasCustomCertificate: boolean;
    pendingUpdateCount: number;
    ipAddress: string;
    lastErrorDate: string;
    lastErrorMessage: string;
    maxConnections: number;
    allowedUpdates: UpdateType[];
}

export enum UpdateType {
    Unknown = 0,
    Message,
    InlineQuery,
    ChosenInlineResult,
    CallbackQuery,
    EditedMessage,
    ChannelPost,
    EditedChannelPost,
    ShippingQuery,
    PreCheckoutQuery,
    Poll,
    PollAnswer,
    MyChatMember,
    ChatMember,
    ChatJoinRequest,
}
