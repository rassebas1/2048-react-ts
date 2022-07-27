export const pixelSize = (): number => {
    console.log('pixelSize', window.innerWidth);
    if (window.innerWidth < 480) {
        return 6;
    }
    else if (window.innerWidth < 768) {
        return 10;
    }
    else return 8;
}