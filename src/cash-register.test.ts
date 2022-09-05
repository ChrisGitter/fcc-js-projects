import checkCashRegister, { CashValue, RegisterStatus } from './cash-register';

it('returns a small amount of change', () => {
  const result = checkCashRegister(19.5, 20, [
    [CashValue.PENNY, 1.01],
    [CashValue.NICKEL, 2.05],
    [CashValue.DIME, 3.1],
    [CashValue.QUARTER, 4.25],
    [CashValue.ONE, 90],
    [CashValue.FIVE, 55],
    [CashValue.TEN, 20],
    [CashValue.TWENTY, 60],
    [CashValue['ONE HUNDRED'], 100],
  ]);
  expect(result).toStrictEqual({
    status: RegisterStatus.OPEN,
    change: [[CashValue.QUARTER, 0.5]],
  });
});

it('returns a large amount of change', () => {
  const result = checkCashRegister(3.26, 100, [
    [CashValue.PENNY, 1.01],
    [CashValue.NICKEL, 2.05],
    [CashValue.DIME, 3.1],
    [CashValue.QUARTER, 4.25],
    [CashValue.ONE, 90],
    [CashValue.FIVE, 55],
    [CashValue.TEN, 20],
    [CashValue.TWENTY, 60],
    [CashValue['ONE HUNDRED'], 100],
  ]);
  expect(result).toStrictEqual({
    status: RegisterStatus.OPEN,
    change: [
      [CashValue.TWENTY, 60],
      [CashValue.TEN, 20],
      [CashValue.FIVE, 15],
      [CashValue.ONE, 1],
      [CashValue.QUARTER, 0.5],
      [CashValue.DIME, 0.2],
      [CashValue.PENNY, 0.04],
    ],
  });
});

it('reports insufficient funds', () => {
  const result = checkCashRegister(19.5, 20, [
    [CashValue.PENNY, 0.01],
    [CashValue.NICKEL, 0],
    [CashValue.DIME, 0],
    [CashValue.QUARTER, 0],
    [CashValue.ONE, 0],
    [CashValue.FIVE, 0],
    [CashValue.TEN, 0],
    [CashValue.TWENTY, 0],
    [CashValue['ONE HUNDRED'], 0],
  ]);
  expect(result).toStrictEqual({
    status: RegisterStatus.INSUFFICIENT_FUNDS,
    change: [],
  });
});

it('reports insufficient funds 2', () => {
  const result = checkCashRegister(19.5, 20, [
    [CashValue.PENNY, 0.01],
    [CashValue.NICKEL, 0],
    [CashValue.DIME, 0],
    [CashValue.QUARTER, 0],
    [CashValue.ONE, 1],
    [CashValue.FIVE, 0],
    [CashValue.TEN, 0],
    [CashValue.TWENTY, 0],
    [CashValue['ONE HUNDRED'], 0],
  ]);
  expect(result).toStrictEqual({
    status: RegisterStatus.INSUFFICIENT_FUNDS,
    change: [],
  });
});

it('reports a closed register', () => {
  const result = checkCashRegister(19.5, 20, [
    [CashValue.PENNY, 0.5],
    [CashValue.NICKEL, 0],
    [CashValue.DIME, 0],
    [CashValue.QUARTER, 0],
    [CashValue.ONE, 0],
    [CashValue.FIVE, 0],
    [CashValue.TEN, 0],
    [CashValue.TWENTY, 0],
    [CashValue['ONE HUNDRED'], 0],
  ]);
  expect(result).toStrictEqual({
    status: RegisterStatus.CLOSED,
    change: [
      [CashValue.PENNY, 0.5],
      [CashValue.NICKEL, 0],
      [CashValue.DIME, 0],
      [CashValue.QUARTER, 0],
      [CashValue.ONE, 0],
      [CashValue.FIVE, 0],
      [CashValue.TEN, 0],
      [CashValue.TWENTY, 0],
      [CashValue['ONE HUNDRED'], 0],
    ],
  });
});
