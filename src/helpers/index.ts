import { FgGreen, BgRed, Reset, FgYellow } from '@/helpers/ANSI_COLORS';

export const LogSuccess = (message: string) => console.log('\n' + FgGreen + message + Reset + '\n');
export const LogError = (message: string) => console.log('\n' + BgRed + message + Reset + '\n');
export const LogWarning = (message: string) => console.log('\n' + FgYellow + message + Reset + '\n');
