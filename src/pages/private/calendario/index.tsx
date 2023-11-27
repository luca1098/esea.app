import BookingCalendar from '@/components/BookingCalendar/BookingCalendar';
import PrivateLayout from '@/components/Layout/PrivateLayout';
import ContentBox from '@/kit/Box/ContentBox';
import PageTitle from '@/kit/Text/PageTitle';
import { fakeUser } from 'mok';

const Calendario = () => {
  return (
    <PrivateLayout user={fakeUser}>
      <PageTitle title='Calendario' />
      <ContentBox>
        <BookingCalendar />
      </ContentBox>
    </PrivateLayout>
  );
};

export default Calendario;
