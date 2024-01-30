export function timeIsSmaller(time0, time1) {
    const [t0h, t0m] = time0.split(':');
    const [t1h, t1m] = time1.split(':');
    if (Number(t0h) < Number(t1h)) {
        return true;
    } else if (Number(t0h) > Number(t1h)) {
        return false;
    } else {
        return Number(t0m) < Number(t1m);
    }
}
export function isTimeOverlay(prev, next) {
    const [s1, e1] = prev.split('~');
    const [s2, e2] = next.split('~');
    if (s1 === s2 || e1 === e2) {
        return true;
    }
    if (s2 === e1 || s1 === e2) {
        return false;
    }
    if (
        // eslint-disable-next-line no-extra-parens
        (timeIsSmaller(s1, s2) && timeIsSmaller(s2, e1)) ||
        // eslint-disable-next-line no-extra-parens
        (timeIsSmaller(s1, e2) && timeIsSmaller(e2, e1))
    ) {
        return true;
    }
    return false;
}
