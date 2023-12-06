export enum PAYMENT_STATUS {
  Abandonment = "Abandonment",
  Created = "Created",
  WaitingPayment = "WaitingPayment",
  Paid = "Paid",
  Refused = "Refused",
  Refunded = "Refunded",
  Chargeback = "Chargeback",
}

export const getPaymentStatusByKey = (key?: string): PAYMENT_STATUS => {
  if (key === undefined) {
    return PAYMENT_STATUS.WaitingPayment;
  }
  return (
    Object.values(PAYMENT_STATUS).find((status) => status === key) ||
    PAYMENT_STATUS.WaitingPayment
  );
};

export const convertToPaymentStatus = (status: string): PAYMENT_STATUS => {
  return (
    PAYMENT_STATUS[status as keyof typeof PAYMENT_STATUS] ||
    PAYMENT_STATUS.WaitingPayment
  );
};
