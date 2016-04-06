export function getTicks(scale, tickValues, ticks) {
    if (tickValues === null) {
        return (scale.ticks ? scale.ticks(...ticks) : scale.domain());
    } else {
        return tickValues;
    }
}
