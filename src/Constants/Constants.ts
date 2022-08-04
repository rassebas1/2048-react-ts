export const pixelSize = (): number => {
    if (window.innerWidth < 480) {
        return 6;
    }
    else if (window.innerWidth > 1200) {
        return 10;
    }
    else return 8;
}