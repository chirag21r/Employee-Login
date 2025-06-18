export declare enum LogAction {
    LOGIN = "LOGIN",
    SIGNUP = "SIGNUP"
}
export declare class Log {
    id: string;
    employeeId: string;
    action: LogAction;
    ipAddress: string;
    userAgent: string;
    timestamp: Date;
}
