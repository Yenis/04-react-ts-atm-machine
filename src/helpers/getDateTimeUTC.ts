
export const getDateTimeUtc = () => {
    // const dateTimeNow =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    //  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    const dateTimeNow =  new Date().toUTCString();
    return new Date(dateTimeNow);
  }
