export const asyncMap = async <InputType, OutputType>(items: InputType[], callback: (item: InputType) => Promise<OutputType>, limit: number): Promise<(OutputType | Error)[]> => {
    const iterator = items.entries();
    const results: (OutputType | Error)[] = new Array(items.length);

    const execute = async () => {
        for (const [index, value] of iterator) {
            try {
                results[index] = await callback(value);
            } catch (error) {
                results[index] = error as Error;
            }
        }
    };

    const workers = Array(limit).fill(0).map(execute);
    await Promise.all(workers);
    return results;
};
