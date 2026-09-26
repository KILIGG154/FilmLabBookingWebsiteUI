import { createBrowserRouter } from "react-router";
import PublicLayout from "../components/PublicLayout";
import HomePage from "./home/page";
import LabsPage from "./labs/page";
import LabDetailPage from "./labs/detail";
import ProfilePage from "./profile/page";
import { LoginPage, RegisterPage, VerifyPage, ResetPasswordPage } from "./auth/pages";
import { AdminLayout, AdminAnalytics, AdminExperts, AdminAccounts, AdminLabs, AdminSettings } from "./portal/admin";
import { ModeratorLayout, ModeratorOrders, ModeratorReports, ModeratorBlog } from "./portal/moderator";
import {
  OwnerLayout, OwnerBookings, OwnerArchive, OwnerCustomers, OwnerConsignments, OwnerAnalytics, OwnerSettings,
} from "./portal/owner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "labs", Component: LabsPage },
      { path: "labs/:slug", Component: LabDetailPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/verify", Component: VerifyPage },
  { path: "/reset-password", Component: ResetPasswordPage },
  {
    path: "/portal/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminAnalytics },
      { path: "experts", Component: AdminExperts },
      { path: "accounts", Component: AdminAccounts },
      { path: "labs", Component: AdminLabs },
      { path: "settings", Component: AdminSettings },
    ],
  },
  {
    path: "/portal/moderator",
    Component: ModeratorLayout,
    children: [
      { index: true, Component: ModeratorOrders },
      { path: "reports", Component: ModeratorReports },
      { path: "blog", Component: ModeratorBlog },
    ],
  },
  {
    path: "/portal/owner",
    Component: OwnerLayout,
    children: [
      { index: true, Component: OwnerBookings },
      { path: "archive", Component: OwnerArchive },
      { path: "customers", Component: OwnerCustomers },
      { path: "consignments", Component: OwnerConsignments },
      { path: "analytics", Component: OwnerAnalytics },
      { path: "settings", Component: OwnerSettings },
    ],
  },
]);
