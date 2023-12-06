import { PAYMENT_STATUS } from "./PAYMENT_STATUS.enum.types";

export enum BUY_STATUS {
  NONINITIATED = "NONINITIATED",
  INITIATED = "INITIATED",
  APPROVED = "APPROVED",
  REFUSED = "REFUSED",
  CHARGEBACK = "CHARGEBACK",
  WAITING = "WAITING",
}

export const getBuyStatusByKey = (key?: string): BUY_STATUS => {
  if (key === undefined) {
    return BUY_STATUS.WAITING;
  }
  return (
    Object.values(BUY_STATUS).find((status) => status === key) ||
    BUY_STATUS.WAITING
  );
};

export const convertPaymentStatusToBuyStatus = (
  paymentStatus: PAYMENT_STATUS
): BUY_STATUS => {
  switch (paymentStatus) {
    case PAYMENT_STATUS.Abandonment:
      return BUY_STATUS.REFUSED; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.Created:
      return BUY_STATUS.INITIATED; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.WaitingPayment:
      return BUY_STATUS.WAITING; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.Paid:
      return BUY_STATUS.APPROVED; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.Refused:
      return BUY_STATUS.REFUSED; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.Refunded:
      return BUY_STATUS.REFUSED; // Map to an appropriate BUY_STATUS
    case PAYMENT_STATUS.Chargeback:
      return BUY_STATUS.CHARGEBACK; // Map to an appropriate BUY_STATUS
    default:
      return BUY_STATUS.WAITING; // Default case
  }
};
