import {
  getCurrentUser,
  listUsers,
  UsersColumns,
  AdminUserNav,
} from "@/features/users";
import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ProductsDataTable } from "@/features/products";
import ErrorToaster from "@/components/layouts/ErrorToaster";
// TODO: CREATE New Data Table for golbaluse

type AdminUsersPageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function UsersPage({ searchParams }: AdminUsersPageProps) {
  const currentUser = await getCurrentUser();

  const users = await listUsers({});

  return (
    <AdminShell heading="Users" description="Edit/Create new user by admin.">
      <AdminUserNav />
      <ProductsDataTable columns={UsersColumns} data={users || []} />
      <Suspense>
        <ErrorToaster />
      </Suspense>
    </AdminShell>
  );
}

export default UsersPage;
