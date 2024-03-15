import { backToLogin, mockLoginForDetox, sleep } from './helpers';

describe('Timer Screen', () => {
  beforeAll(async () => {
    await device.launchApp({
      launchArgs: { detoxEnableSynchronization: 0 },
    });
  });

  it('should have home screen "timer test"', async () => {
    await mockLoginForDetox();
  });
  it('should have timer screen', async () => {
    const StyledTimerScreenContainerTestID = element(
      by.id('StyledTimerScreenContainerTestID')
    );
    const CalculatorCard = element(by.text('Timer'));

    await waitFor(CalculatorCard).toBeVisible().withTimeout(10000);
    await CalculatorCard.tap();

    await waitFor(StyledTimerScreenContainerTestID)
      .toBeVisible()
      .withTimeout(10000);
  });
  it('should check timer logic', async () => {
    const DateTimePickerTestID = element(by.id('DateTimePickerTestID'));
    const RightButtonOnPressTestID = element(by.id('RightButtonOnPressTestID'));
    const CancelTimerTestID = element(by.id('CancelTimerTestID'));
    const StyledTimerCircleContentWrapperTestID = element(
      by.id('StyledTimerCircleContentWrapperTestID')
    );

    await RightButtonOnPressTestID.tap();
    await RightButtonOnPressTestID.tap();

    await waitFor(StyledTimerCircleContentWrapperTestID)
      .toBeVisible()
      .withTimeout(10000);
    await CancelTimerTestID.tap();
    await waitFor(DateTimePickerTestID).toBeVisible().withTimeout(10000);
  });

  it('should return to home and log out', async () => {
    const Home = element(by.text('Home'));
    await Home.tap();
    await sleep(3000);
    await backToLogin();
  });
});
