import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvier } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvier client={queryClient}>
      <Router />
    </QueryClientProvier>
  );
};

export default App;
