import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
