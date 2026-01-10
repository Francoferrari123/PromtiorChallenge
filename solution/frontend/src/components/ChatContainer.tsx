import SessionInfo from './SessionInfo';
import Header from './Header';
import ErrorBanner from './ErrorBanner';
import ChatbotInput from './ChatbotInput';
import AllMessagesContainer from './AllMessagesContainer';

export default function ChatContainer() {

  return (
    <div className="flex grow flex-col h-screen min-h-0 grid-rows-[auto_auto_auto_1fr_auto] bg-gradient-to-br from-black to-red">
      <Header />
      <SessionInfo />
      <ErrorBanner />
      <AllMessagesContainer />
      <ChatbotInput />
    </div>
  );
}
