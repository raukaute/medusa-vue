import { fixtures } from '../../../../mocks/data';
import { useGiftCard } from '../../../../src/';
import { createWrapperComponent, waitFor } from '../../../utils';

describe('useGiftCard hook', () => {
  test('returns a gift card', async () => {
    const giftCard = fixtures.get('gift_card');
    const { vm } = createWrapperComponent(() => useGiftCard(giftCard.id));

    await waitFor(() => vm.isSuccess);

    expect(vm.data?.response.status).toEqual(200);
    expect(vm.data?.gift_card).toEqual(giftCard);
  });
});
