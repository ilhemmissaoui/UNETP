const generateUUID = (prefix) => {
    let date = new Date();
    let today_abs = new Date();
    let year = date.getFullYear().toString().substr(2, 2);
    let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let mSecs = date.getMilliseconds().toString().padStart(5, '3');
    today_abs.setHours(0);
    today_abs.setMinutes(0);
    today_abs.setSeconds(0);
    let tSecs = (date.getTime() - today_abs.getTime()) / 1000;
    return prefix + year + month + day + tSecs + mSecs;
};
export const generateInvitationCode = (length = 6) =>
    new Array(length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 9))
        .join('');

export default generateUUID;
