interface FakeStripeParams {
  amount: number;
  currency: string;
}
const fakeStripePayment = async ({ amount, currency }: FakeStripeParams) => {
  console.log(currency);
  const clientSecret = "rondomValueshere";
  return {
    clientSecret,
    amount,
  };
};
export default fakeStripePayment;
