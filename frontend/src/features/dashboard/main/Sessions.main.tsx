
import { getSessions } from '../actions/sessions.action';
import SessionHeader from '../components/sessions/SessionHeader';
import SessionTable from '../components/sessions/SessionTable';


const SessionsMain = async () => {
  const adviceFitSessions = await getSessions();      
  return (
    <>
      <SessionHeader />
      <SessionTable adviceFitSession={adviceFitSessions.session ?? []} />
    </>
  )
}

export default SessionsMain
