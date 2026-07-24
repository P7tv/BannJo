import ClientGroupPage from "../../components/group/ClientGroupPage";

// This is a Server Component but delegates to client for context-based navigation
export default function Group() {
  // Always use client-side rendering with context for navigation
  return <ClientGroupPage />;
}
