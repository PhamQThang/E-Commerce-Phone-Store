"use client";

import { useEffect, useState } from "react";
import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
    role: "admin",
  },
  {
    title: "Quản lý sản phẩm",
    url: "/admin/products",
    icon: Search,
    role: "admin",
    submenu: [
      {
        title: "Tất cả sản phẩm",
        url: "/admin/products/all",
      },
      {
        title: "Thêm sản phẩm mới",
        url: "/admin/products/add",
      },
    ],
  },
  {
    title: "Quản lý đơn hàng",
    url: "/admin/orders",
    icon: Inbox,
    role: "admin",
    submenu: [
      {
        title: "Đơn hàng chờ xử lý",
        url: "/admin/orders/pending",
      },
      {
        title: "Đơn hàng đã xử lý",
        url: "/admin/orders/processed",
      },
    ],
  },
  {
    title: "Quản lý khách hàng",
    url: "/admin/customers",
    icon: Calendar,
    role: "admin",
    submenu: [
      {
        title: "Danh sách khách hàng",
        url: "/admin/customers/list",
      },
      {
        title: "Thêm khách hàng mới",
        url: "/admin/customers/add",
      },
    ],
  },
  {
    title: "Quản lý nhân viên",
    url: "/admin/staff",
    icon: Settings,
    role: "admin",
    submenu: [
      {
        title: "Danh sách nhân viên",
        url: "/admin/staff/list",
      },
      {
        title: "Thêm nhân viên mới",
        url: "/admin/staff/add",
      },
    ],
  },
  {
    title: "Khuyến mãi",
    url: "/admin/promotions",
    icon: Search,
    role: "admin",
  },
  {
    title: "Cài đặt",
    url: "/admin/settings",
    icon: Settings,
    role: "admin",
  },
];

export function AppSidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const filteredItems = items.filter((item) => item.role === role);

  return (
    <Sidebar className="w-64 bg-white shadow-lg">
      <SidebarGroup>
        <SidebarGroupLabel>Quản lý hệ thống</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {filteredItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.submenu ? (
                  <Collapsible defaultOpen={false} className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenu>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}