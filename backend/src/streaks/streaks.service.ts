import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

enum StreakState {
    UNSET = 'UNSET',
    COMPLETED = 'COMPLETED',
    INCOMPLETE = 'INCOMPLETE',
    AT_RISK = 'AT_RISK',
    SAVED = 'SAVED',
    ERROR = 'ERROR'
}

interface Streak {
    date: string;
    activities: string[];
    state: StreakState;
}


@Injectable()
export class StreaksService {
    private readonly dataFilePath = path.join(__dirname, '../data/data.json');

    /**
     * Assumptions:
     * Assume that JSON file contains the same format as response (Streak object)
     * JSON file should contain at least 7 CONSECUTIVE days from the date today and the previous 6 days.
     * JSON will only contain 7 days of data because the streak is only for the past 7 days.
     * Assumes that JSON array is unsorted. Will sort descending in calculateStreaks()
     */
    getStreaks(caseId: number): any {
        const data = this.readDataFromFile();
        const streaks: Streak[] = data[caseId - 1] || [];
        return this.calculateStreaks(streaks);
    }

    private readDataFromFile(): any {
        const rawData = fs.readFileSync(this.dataFilePath, 'utf8');
        return JSON.parse(rawData);
    }


    private areConsecutiveDays(date1: string, date2: string, gapInDays: number): boolean {
        const firstDate = moment(date1).format('YYYY-MM-DD');
        const secondDate = moment(date2).add(gapInDays, 'days').format('YYYY-MM-DD');
        return firstDate === secondDate;
    }

    private evaluateAtRiskState(atRiskCount: number, activitiesToday: number, todayStreak: Streak) {
        if (atRiskCount > 2) {
            throw new Error("There should not be more than 2 at risk days. Something is wrong with the input data.");
        } else if (atRiskCount === 1 && activitiesToday < 2) {
            todayStreak.state = StreakState.AT_RISK;
        } else if (activitiesToday >= atRiskCount + 1) {
            todayStreak.state = StreakState.SAVED;
        } else {
            todayStreak.state = StreakState.INCOMPLETE;
        }
    }

    private computeTotalStreak(streaks: Streak[]): number {
        let total = 0;
        
        for (const streak of streaks) {
            if (![StreakState.COMPLETED, StreakState.SAVED, StreakState.AT_RISK].includes(streak.state)) {
                break; // Stops immediately when an invalid state is found
            }
            total++;
        }
    
        return total;
    }
    

    private fillStreakGap(streaks: Streak[], total: number) {
        const currentDate = moment();
        for (let i = 0; i < 7 - Math.max(total, 1); i++) {
            const newDate = currentDate.clone().add(i + 1, 'days').format('YYYY-MM-DD');
            streaks.unshift({
                date: newDate,
                activities: [],
                state: StreakState.INCOMPLETE
            });
            streaks.pop();
        }
    }

    private calculateStreaks(streaks: Streak[]): any {
        const today = moment().format('YYYY-MM-DD');
        let todayStreak = streaks[0];
        todayStreak.state = StreakState.UNSET; 

        streaks.sort((a, b) => moment(b.date).diff(moment(a.date)));

        if (todayStreak?.date !== today) {
            throw new Error("No information regarding today's activities.");
        }

        const activitiesToday = todayStreak?.activities?.length || 0;

        let atRiskCount = 0;

        for (let i = 1; i < streaks.length && todayStreak.state === StreakState.UNSET; i++) {
            const curState = streaks[i]?.state || StreakState.INCOMPLETE;

            if (!this.areConsecutiveDays(today, streaks[i].date, i)) {
                throw new Error(`Streaks are not consecutive days at index ${i}.`);
            }

            if (curState === StreakState.AT_RISK) {
                atRiskCount++;
            } else if (atRiskCount > 0) {
                this.evaluateAtRiskState(atRiskCount, activitiesToday, todayStreak);
            } else if ([StreakState.INCOMPLETE, StreakState.COMPLETED, StreakState.SAVED].includes(curState)) {
                todayStreak.state = activitiesToday > 0 ? StreakState.COMPLETED : StreakState.AT_RISK;
            }
        }

        let total = this.computeTotalStreak(streaks);
        if (total < 7) {
            this.fillStreakGap(streaks, total);
        }

        return {
            activitiesToday,
            total,
            days: streaks
        };
    }
}