const mainMockEmail = 'art@gmail.com';
const mainMockPassword = 'Pass123';
export const mockLoginForDetox = async () => {
  const LoginWrapperTestID = element(by.id('LoginWrapperTestID'));
  const EmailInput = element(by.id('StyledCustomInputTest')).atIndex(0);
  const PasswordInput = element(by.id('StyledCustomInputTest')).atIndex(1);
  const HandleSubmitTestID = element(by.id('HandleSubmitTestID'));
  const WelcomeBack = element(by.id('StyledLoginScreenCenterTitle'));
  const TabsSimpleButton = element(by.id('TabsSimpleButton'));

  await waitFor(LoginWrapperTestID).toBeVisible().withTimeout(10000);

  await TabsSimpleButton.atIndex(1).tap();
  await waitFor(WelcomeBack).toBeVisible().withTimeout(10000);

  await EmailInput.typeText(mainMockEmail);
  await PasswordInput.typeText(mainMockPassword);
  await HandleSubmitTestID.tap();
};
export const backToLogin = async () => {
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
  await waitFor(HomeRightButtonTestID).toBeVisible().withTimeout(10000);
  await HomeRightButtonTestID.tap();

  await waitFor(StyledLoadingWrapperTestID).toBeVisible().withTimeout(10000);
  await waitFor(LoginWrapperTestID).toBeVisible().withTimeout(10000);
};
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
