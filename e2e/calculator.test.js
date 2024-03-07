import { backToLogin, mockLoginForDetox } from './helpers';

describe('Calculator Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have home screen', async () => {
    await mockLoginForDetox();
  });
  it('should have calculator screen', async () => {
    const StyledCalculatorContentContainerTestID = element(
      by.id('StyledCalculatorContentContainerTestID')
    );
    const CalculatorCard = element(by.text('Calculator'));

    await waitFor(CalculatorCard).toBeVisible().withTimeout(10000);
    await CalculatorCard.tap();

    await waitFor(StyledCalculatorContentContainerTestID)
      .toBeVisible()
      .withTimeout(10000);
  });
  it('should check calculator logic', async () => {
    const Number = element(by.text('5')).atIndex(0);
    const Plus = element(by.text('+'));
    const Minus = element(by.text('-'));
    const Divide = element(by.text('/'));
    const Multiplication = element(by.text('X'));
    const Equal = element(by.text('='));
    const ChangeSign = element(by.text('+/-'));
    const Percent = element(by.text('%'));
    const Clear = element(by.text('C'));
    const StyledCalculatorRoundButtonTextTestID1 = element(
      by.id('StyledCalculatorRoundButtonTextTestID1')
    );
    //addition
    await Number.tap();
    await Plus.tap();
    await Number.tap();
    await Equal.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('10')
      .withTimeout(10000);
    //decreasing
    await Minus.tap();
    await Number.tap();
    await Equal.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('5')
      .withTimeout(10000);
    //multiplication
    await Multiplication.tap();
    await Number.tap();
    await Equal.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('25')
      .withTimeout(10000);
    //division
    await Divide.tap();
    await Number.tap();
    await Equal.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('5')
      .withTimeout(10000);
    //change sign
    await ChangeSign.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('-5')
      .withTimeout(10000);
    //percent
    await Percent.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('-0.05')
      .withTimeout(10000);
    //clear
    await Clear.tap();
    await waitFor(StyledCalculatorRoundButtonTextTestID1)
      .toHaveText('0')
      .withTimeout(10000);
  });
  it('should return to home and log out', async () => {
    const Home = element(by.text('Home'));
    await Home.tap();
    await backToLogin();
  });
});
