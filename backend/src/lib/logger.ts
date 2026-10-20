import { createHash } from 'crypto';

type LogLevel = 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

function emit(level: LogLevel, context: LogContext): void {
  if (process.env.NODE_ENV === 'test' && process.env.LOGGER_SILENT !== 'false') return;
  const line = JSON.stringify({ ts: new Date().toISOString(), level, ...context });
  if (level === 'error') {
    process.stderr.write(line + '\n');
  } else {
    process.stdout.write(line + '\n');
  }
}

export const logger = {
  info: (context: LogContext) => emit('info', context),
  warn: (context: LogContext) => emit('warn', context),
  error: (context: LogContext) => emit('error', context),
};

export function hashEmail(email: string | undefined | null): string | undefined {
  if (!email) return undefined;
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex').slice(0, 12);
}
