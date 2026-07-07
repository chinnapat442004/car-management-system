import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from '../components/AppSidebar';

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-3">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
export default Layout;
