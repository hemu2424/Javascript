type Falsy = false | 0 | 0n | "" | null | undefined;


export function compact<T>(
    array: readonly T[]
): Exclude<T, Falsy>[] {
    return array.filter(
        (value): value is Exclude<T, Falsy> => Boolean(value)
    );
}

export function unique<T>(
    array:readonly T[]):T[]{
        return [... new Set(array)]
    }


export function shuffle<T>(
    array: readonly T[]
): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] = [
            shuffled[randomIndex]!,
            shuffled[i]!,
        ];
    }

    return shuffled;
}

export function random<T>(
    array:readonly T[]
):T | undefined {
    if ( array.length === 0 ){
        return undefined
    }
    const randomindex = Math.floor(Math.random() * array.length);
    return array[randomindex]
}

export function groupBy<T extends Record<PropertyKey,unknown>,K extends keyof T>(array:readonly T[],key:K):Record<string,T[]>{
    return array.reduce((groups,item)=>{
        const group = String(item[key]);
        if(!groups[group]){
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    },{} as Record<string,T[]>)

}

export function keyBy<
    T extends Record<PropertyKey, unknown>,
    K extends keyof T
>(
    array: readonly T[],
    key: K
): Record<string, T> {
    return array.reduce((result, item) => {
        result[String(item[key])] = item;
        return result;
    }, {} as Record<string, T>);
}