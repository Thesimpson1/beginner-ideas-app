const backToLogin = async () => {
  const LoginWrapperTestID = element(by.id('LoginWrapperTestID'));
  const StyledHomeScreenContainerTestID = element(
    by.id('StyledHomeScreenContainerTestID')
  );
  const HomeRightButtonTestID = element(by.id('HomeRightButtonTestID'));
  const StyledLoadingWrapperTestID = element(
    by.id('StyledLoadingWrapperTestID')
  );
  await waitFor(StyledHomeScreenContainerTestID)
    .toBeVisible()
    .withTimeout(10000);
  await expect(HomeRightButtonTestID).toBeVisible();
  await HomeRightButtonTestID.tap();

  await waitFor(StyledLoadingWrapperTestID).toBeVisible().withTimeout(10000);
  await waitFor(LoginWrapperTestID).toBeVisible().withTimeout(10000);
};

describe('Login Screen', () => {
  const mockEmail = `TestEmail${Math.random().toFixed(6)}@gmail.com`;
  const mockPassword = `TestPass${Math.random().toFixed(6)}`;

  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have login screen', async () => {
    const SplashContainerTestID = element(by.id('SplashContainerTestID'));
    const LoginWrapperTestID = element(by.id('LoginWrapperTestID'));

    await expect(SplashContainerTestID).toBeVisible();
    await waitFor(LoginWrapperTestID).toBeVisible().withTimeout(10000);
  });
  it('should check "Or skip this step" flow', async () => {
    const SkipButton = element(by.text('Or skip this step'));

    await expect(SkipButton).toBeVisible();
    await SkipButton.tap();

    await backToLogin();
  });
  it('should check "nonexistent user" flow', async () => {
    const EmailInput = element(by.id('StyledCustomInputTest')).atIndex(0);
    const PasswordInput = element(by.id('StyledCustomInputTest')).atIndex(1);
    const HandleSubmitTestID = element(by.id('HandleSubmitTestID'));
    const TabsSimpleButton = element(by.id('TabsSimpleButton'));
    const WelcomeBack = element(by.id('StyledLoginScreenCenterTitle'));
    const StyledErrorToastTest = element(by.id('StyledErrorToastTest'));
    const LoginWrapperTestID = element(by.id('LoginWrapperTestID'));

    await TabsSimpleButton.atIndex(1).tap();
    await waitFor(WelcomeBack).toBeVisible().withTimeout(10000);

    await EmailInput.typeText(mockEmail);
    await PasswordInput.typeText(mockPassword);
    await HandleSubmitTestID.tap();

    await waitFor(StyledErrorToastTest).toBeVisible().withTimeout(10000);

    await TabsSimpleButton.atIndex(0).tap();

    await waitFor(LoginWrapperTestID).toBeVisible().withTimeout(10000);
  });
  it('should check "Sign Up" flow', async () => {
    const EmailInput = element(by.id('StyledCustomInputTest')).atIndex(0);
    const PasswordInput = element(by.id('StyledCustomInputTest')).atIndex(1);
    const HandleSubmitTestID = element(by.id('HandleSubmitTestID'));
    const StyledErrorEmailTextTest = element(
      by.id('StyledErrorTextTest')
    ).atIndex(0);
    const StyledErrorPasswordTextTest = element(
      by.id('StyledErrorTextTest')
    ).atIndex(1);

    await expect(EmailInput).toBeVisible();
    await expect(PasswordInput).toBeVisible();

    await EmailInput.tap();
    await PasswordInput.tap();
    await waitFor(StyledErrorEmailTextTest).toBeVisible().withTimeout(3000);

    await EmailInput.tap();
    await waitFor(StyledErrorPasswordTextTest).toBeVisible().withTimeout(3000);

    await EmailInput.typeText(mockEmail);
    await PasswordInput.typeText(mockPassword);
    await HandleSubmitTestID.tap();

    await backToLogin();
  });
  it('should check "Sign In" flow', async () => {
    const WelcomeBack = element(by.id('StyledLoginScreenCenterTitle'));
    const TabsSimpleButton = element(by.id('TabsSimpleButton')).atIndex(1);
    const EmailInput = element(by.id('StyledCustomInputTest')).atIndex(0);
    const PasswordInput = element(by.id('StyledCustomInputTest')).atIndex(1);
    const HandleSubmitTestID = element(by.id('HandleSubmitTestID'));

    await expect(TabsSimpleButton).toBeVisible();
    await TabsSimpleButton.tap();
    await waitFor(WelcomeBack).toBeVisible().withTimeout(10000);

    await EmailInput.typeText(mockEmail);
    await PasswordInput.typeText(mockPassword);
    await HandleSubmitTestID.tap();

    await backToLogin();
  });
});
