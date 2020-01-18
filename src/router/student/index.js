const student = {
  path: "/",
  component: () => import("@/layouts/Index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/pages/Home.vue"),
      meta: {
        title: "首页",
        key: "/"
      },
      name: "首页"
    },
    {
      path: "affairsmanagement",
      component: () => import("@/pages/affairs/AffairsManagement.vue"),
      meta: {
        title: "活动管理",
        key: "/affairsmanagement"
      },
      name: "活动管理"
    },
    {
      path: "meetingmanagement",
      component: () => import("@/pages/affairs/MeetingManagement.vue"),
      meta: {
        title: "例会管理",
        key: "/meetingmanagement"
      },
      name: "例会管理"
    },
    {
      path: "departmentmanagement",
      component: () => import("@/pages/affairs/DepartmentManagement.vue"),
      meta: {
        title: "部门事务",
        key: "/departmentmanagement"
      },
      name: "部门事务"
    },
    {
      path: "organizationconstruction",
      component: () => import("@/pages/affairs/OrganizationConstruction.vue"),
      meta: {
        title: "组织建设",
        key: "/organizationconstruction"
      },
      name: "组织建设"
    }
  ]
};

export default student;
