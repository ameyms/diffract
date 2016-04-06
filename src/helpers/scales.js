
export function scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
}

export function scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range());
}
