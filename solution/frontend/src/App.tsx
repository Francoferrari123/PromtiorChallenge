import { AgentProvider } from './contexts/agentProvider';
import MainPage from './pages/MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5000,
      },
    },
  });


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AgentProvider>
          <MainPage />
        </AgentProvider>
      </QueryClientProvider>
    </>
  );
}
