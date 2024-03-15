import { backToLogin, mockLoginForDetox } from './helpers';

describe('Notes and Create Notes Screens', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have home screen "notes test"', async () => {
    await mockLoginForDetox();
  });
  it('should have notes screen', async () => {
    const StyledNotesScreenContainerTestID = element(
      by.id('StyledTimerScreenContainerTestID')
    );
    const NotesCard = element(by.text('Notes'));

    await waitFor(NotesCard).toBeVisible().withTimeout(10000);
    await NotesCard.tap();

    await waitFor(StyledNotesScreenContainerTestID)
      .toBeVisible()
      .withTimeout(10000);
  });
  it('should check create note logic', async () => {
    const StyledCreateNoteScreenContainerTestID = element(
      by.id('StyledCreateNoteScreenContainerTestID')
    );
    const TouchableOpacityTestID = element(by.id('TouchableOpacityTestID'));
    const StyledBottomComponentTextTestID = element(
      by.id('StyledBottomComponentTextTestID')
    );
    const StyledInputWrapperTestID = element(by.id('StyledInputWrapperTestID'));
    const Done = element(by.text('Done'));
    const Back = element(by.text('Back'));
    const StyledNotesScreenContainerTestID = element(
      by.id('StyledTimerScreenContainerTestID')
    );

    await TouchableOpacityTestID.tap();
    await waitFor(StyledCreateNoteScreenContainerTestID)
      .toBeVisible()
      .withTimeout(10000);

    await StyledInputWrapperTestID.typeText('New Note');
    await Done.tap();
    await Back.tap();

    await waitFor(StyledNotesScreenContainerTestID)
      .toBeVisible()
      .withTimeout(10000);
    await waitFor(StyledBottomComponentTextTestID)
      .toHaveText(`1 notes`)
      .withTimeout(10000);
  });
  it('should check search', async () => {
    const StyledEmptyWrapperID = element(by.id('StyledEmptyWrapperID'));
    const StyledSimpleButtonWrapperTest = element(by.text('Cancel'));
    const Today = element(by.text('Today'));
    const StyledCardContainerTestID = element(
      by.id('StyledCardContainerTestID')
    );

    await StyledEmptyWrapperID.tap();
    await waitFor(StyledSimpleButtonWrapperTest)
      .toBeVisible()
      .withTimeout(10000);

    await StyledEmptyWrapperID.typeText('n');
    await waitFor(StyledCardContainerTestID).toBeVisible().withTimeout(10000);

    await StyledSimpleButtonWrapperTest.tap();
    await waitFor(Today).toBeVisible().withTimeout(10000);
  });
  it('should check menu logic', async () => {
    const StyledMenuIconTestID = element(by.id('StyledMenuIconTestID'));
    const StyledRightMenuWrapperTestID = element(
      by.id('StyledRightMenuWrapperTestID')
    );
    const StyledShadowModalWrapperTestID = element(
      by.id('StyledShadowModalWrapperTestID')
    );
    const Sort = element(by.text('Sort'));
    const ByNames = element(by.text('By names'));
    const DateSort = element(by.text('Date sort'));
    const On = element(by.text('On'));
    const Today = element(by.text('Today'));

    await StyledMenuIconTestID.tap();
    await waitFor(StyledRightMenuWrapperTestID)
      .toBeVisible()
      .withTimeout(10000);
    await Sort.tap();
    await waitFor(ByNames).toBeVisible().withTimeout(10000);
    await ByNames.tap();
    await StyledShadowModalWrapperTestID.tap();
    await waitFor(Today).not.toBeVisible().withTimeout(10000);

    await StyledMenuIconTestID.tap();
    await waitFor(StyledRightMenuWrapperTestID)
      .toBeVisible()
      .withTimeout(10000);
    await DateSort.tap();
    await waitFor(On).toBeVisible().withTimeout(10000);
    await On.tap();
    await StyledShadowModalWrapperTestID.tap();
    await waitFor(Today).toBeVisible().withTimeout(10000);
  });
  it('should check delete notes logic', async () => {
    const NewNote = element(by.text('New Note'));
    const DeleteElementTestID = element(by.id('DeleteElementTestID'));
    const StyledBottomComponentTextTestID = element(
      by.id('StyledBottomComponentTextTestID')
    );

    await NewNote.swipe('left', 'slow');
    await waitFor(DeleteElementTestID).toBeVisible().withTimeout(10000);
    await DeleteElementTestID.tap();
    await waitFor(StyledBottomComponentTextTestID)
      .toHaveText(`0 notes`)
      .withTimeout(10000);
  });
  it('should return to home and log out', async () => {
    const Back = element(by.text('Back'));
    await Back.tap();
    await backToLogin();
  });
});
