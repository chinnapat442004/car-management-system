import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from './ui/sidebar';

import { Car } from 'lucide-react';
import { SquareMenu } from 'lucide-react';

import { useLocation } from 'react-router';

export function AppSidebar() {
  const projects = [
    { name: 'Cars', url: '/', icon: Car },
    { name: 'Brands', url: '/brand', icon: SquareMenu },
  ];

  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {projects.map((project) => {
            const isActive = project.url === location.pathname;
            return (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton
                  className={` ${
                    isActive
                      ? 'bg-[#1E293B] text-white pointer-events-none'
                      : 'text-gray-600 hover:bg-slate-800/10 hover:text-slate-900'
                  }`}
                >
                  <a href={project.url} className="flex gap-2 w-full">
                    <project.icon />
                    <span>{project.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
