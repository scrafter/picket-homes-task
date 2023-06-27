import { asyncMap } from './asyncMap.ts';

describe('asyncMap', () => {
    it('returns proper data - happy path', async () => {
        const items = [1, 2, 3, 4, 5];
        const callback = (item: number) => {
            return new Promise(resolve => {
                const randomTimeout = Math.floor(Math.random() * 10_000);
                setTimeout(() => resolve(item * 1_000), randomTimeout);
            });
        }
        const results = await asyncMap(items, callback, 2);
        expect(results).toEqual(items.map(item => item * 1_000));
    }, 15_000);

    it('takes limit into account', async () => {
        const DESIRED_LOGS = [
            'started - 1',
            'started - 2',
            'finished - 1',
            'started - 3',
            'finished - 2',
            'started - 4',
            'finished - 3',
            'started - 5',
            'finished - 4',
            'finished - 5',
        ] as const;
        const logs: string[] = [];
        const items = [1, 2, 3, 4, 5];
        const callback = (item: number) => {
            return new Promise(resolve => {
                logs.push(`started - ${item}`);
                setTimeout(() => {
                    logs.push(`finished - ${item}`);
                    resolve(item * 1_000);
                }, 1_000);
            });
        }
        await asyncMap(items, callback, 2);
        expect(logs).toEqual(DESIRED_LOGS);
    });

    it('returns proper data - error handling', async () => {
        const items = [1, 2, 3, 4, 5];
        const ERROR = new Error('random-error');

        const callback = (item: number) => {
            return new Promise((resolve, reject) => {
                if (item === 2) {
                    reject(ERROR);
                }
                setTimeout(() => resolve(item * 1_000), 500);
            });
        }
        const results = await asyncMap(items, callback, 2);
        expect(results[1]).toEqual(ERROR);
    });
});
