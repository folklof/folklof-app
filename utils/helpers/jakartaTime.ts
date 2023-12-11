import moment from "moment";

export function generateJakartaDate(): string {
  const gmtPlus7Date = moment()
    .utcOffset("+07:00")
    .format();
  return gmtPlus7Date;
}
