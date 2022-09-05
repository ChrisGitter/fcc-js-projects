export enum CashValue {
  PENNY = 'PENNY',
  NICKEL = 'NICKEL',
  DIME = 'DIME',
  QUARTER = 'QUARTER',
  ONE = 'ONE',
  FIVE = 'FIVE',
  TEN = 'TEN',
  TWENTY = 'TWENTY',
  'ONE HUNDRED' = 'ONE HUNDRED',
}

export enum RegisterStatus {
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
}

export type CashRegister = [CashValue, number];

interface CheckRegisterResult {
  status: RegisterStatus;
  change: CashRegister[];
}

const valueWorth = new Map<CashValue, number>([
  [CashValue.PENNY, 0.01],
  [CashValue.NICKEL, 0.05],
  [CashValue.DIME, 0.1],
  [CashValue.QUARTER, 0.25],
  [CashValue.ONE, 1.0],
  [CashValue.FIVE, 5.0],
  [CashValue.TEN, 10.0],
  [CashValue.TWENTY, 20.0],
  [CashValue['ONE HUNDRED'], 100.0],
]);

export const roundCash = (cash: number): number => {
  return Math.round(cash * 100) / 100;
};

const checkCashRegister = (
  price: number,
  cash: number,
  register: CashRegister[],
): CheckRegisterResult => {
  let changeTotal = Math.max(0, cash - price);
  let change: CashRegister[] = [];

  let status = RegisterStatus.CLOSED;

  // Push change entries from highest to lowest - inverse of the given register
  for (const [valueType, sumInRegister] of [...register].reverse()) {
    const unitValue = valueWorth.get(valueType)!;

    const amountInChange = Math.floor(changeTotal / unitValue);
    const amountInRegister = Math.floor(sumInRegister / unitValue);
    const amountReturned = Math.min(amountInChange, amountInRegister);

    if (amountReturned !== amountInRegister) {
      // Register stays open if any cash is left
      status = RegisterStatus.OPEN;
    }

    if (amountReturned) {
      const valueReturned = amountReturned * unitValue;
      changeTotal = roundCash(changeTotal - valueReturned);

      change.push([valueType, valueReturned]);
    }
  }

  // Report insufficuent funds
  if (changeTotal !== 0) {
    status = RegisterStatus.INSUFFICIENT_FUNDS;
    change = [];
  }

  // Return the full register if it will be closed
  if (status === RegisterStatus.CLOSED) {
    change = register;
  }

  return {
    status,
    change,
  };
};

export default checkCashRegister;
