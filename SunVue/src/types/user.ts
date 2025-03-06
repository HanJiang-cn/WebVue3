interface MenuItem {
    name: string;
    path: string;
    // icon: string;
    children?: MenuItem[];

}
export type { MenuItem }