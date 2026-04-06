export declare const configuration: () => {
    port: number;
    mongodbUri: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    bcryptRounds: number;
    clinicTimezone: string;
    workdayStartHour: number;
};
export type ConfigurationType = ReturnType<typeof configuration>;
