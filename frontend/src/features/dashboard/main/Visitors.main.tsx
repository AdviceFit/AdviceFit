
import VisitorsHeader from '../components/visitors/VisitorsHeader';
import VisitorsTable from '../components/visitors/VisitorsTable';
import { getVisitor } from '../actions/visitors.action';

const visitorsMain = async () => {
  const adviceFitVisitors = await getVisitor();

  return (
    <>
      <VisitorsHeader />
      <VisitorsTable adviceFitVisitors={adviceFitVisitors?.visitors ?? []} />
    </>
  )
}

export default visitorsMain
