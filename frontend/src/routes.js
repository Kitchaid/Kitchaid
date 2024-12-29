import React, { lazy } from "react";

const NewOrder = lazy(() =>
  import("./pages/plan/orders/newOrder")
);
const NewStats = lazy(() =>
  import("./pages/producer/newStats")
);
const ProductionList = lazy(() =>
  import("./pages/producer/components/lunchStats/subKitchen/logbooktables")
);
const NewStatsReceiver = lazy(() =>
  import("./pages/receiver/newStatsReceiver")
);
const StatsRecordReceiver = lazy(() =>
  import("./pages/receiver/components/statsRecordReceiver")
);
const Workplan = lazy(() => import("./pages/plan/workPlan/workPlan"));
const StatsRecord = lazy(() =>
  import("./pages/producer/components/lunchStats/statsRecord")
);
const SubKitchen = lazy(() =>
  import("./pages/producer/components/lunchStats/subKitchen")
);
const Vikarieparm = lazy(() =>
  import("./pages/receiver/sub_index/vikarieparm/vikarieparm")
);
const WorkRoutine = lazy(() =>
  import("./pages/receiver/sub_index/vikarieparm/workRoutine")
);
const OrderRoutine = lazy(() =>
  import("./pages/plan/orderRoutine/orderRoutine")
);
const KitchenRoutine = lazy(() =>
  import("./pages/plan/workPlan/workRoutine/workRoutine")
);
const FoodWaste = lazy(() =>
  import("./pages/control/foodWaste/foodWaste")
);
const Message = lazy(() =>
  import("./pages/message/Messages")
);
const DailyMealIngredientsProducer = lazy(() =>
  import("./pages/plan/DailyMealIngredient/DailyMealIngredientsProducer")
);
const DailyMealIngredientsReceiver = lazy(() =>
  import("./pages/plan/DailyMealIngredient/DailyMealIngredientsReceiver")
);
const SpecialKost = lazy(() =>
  import("./pages/producer/components/specialKost")
);
const UnifiedLunchOrders = lazy(() =>
  import("./pages/producer/sub_index/lunchOrders")
);
const LunchOrders = lazy(() =>
  import("./pages/receiver/sub_index/lunchOrders")
);
const KitchenSetting = lazy(() =>
  import("./pages/admin/component/kitchenSetting/KitchenSetting")
);
const DataAnalyze = lazy(() =>
  import("./pages/admin/component/DataAnalyze")
);
const NewUser = lazy(() =>
  import("./pages/admin/component/NewUser")
);
const MultiUserNewStat = lazy(() =>
  import("./pages/admin/component/statsRegister")
);
const QuantityTemplate = lazy(() =>
  import("./pages/admin/component/quantityTemplate")
);
const SpecialkostSetting = lazy(() =>
  import("./pages/admin/component/superiorAdmin/Specialkost/specialkostSetting")
);
const MenuSetting = lazy(() =>
  import('./pages/admin/component/superiorAdmin/menuSetting/menuSetting')
);
const MenuTemplate = lazy(() =>
  import('./pages/admin/component/superiorAdmin/menuSetting/menuTemplate')
);
const SidesTemplate = lazy(() =>
  import('./pages/admin/component/superiorAdmin/menuSetting/sidesTemplate')
);
const DataAnalyzeAdmin = lazy(() =>
import('./pages/admin/component/DataAnalyze')
);
const NewAdmin = lazy(() =>
import('./pages/admin/component/superiorAdmin/adminSetting/sectionAdminSetting')
);
const SpecialkostType = lazy(() =>
import('./pages/admin/component/superiorAdmin/Specialkost/specialType')
);
const LoginTrace = lazy(() =>
import('./pages/admin/component/LoginTrace')
);



export const routerMaster = [
{
    path: "/user/newOrder",
    component: <NewOrder />,
    name: "Ny beställning",
    icon: "fa-solid fa-list-check fa-xl",
    layout: "/producer",
  },
  {
    path: "/newStats",
    component: <NewStats />,
    name: "Ny Lunch Statistik",
    icon: "fa-regular fa-chart-bar fa-xl",
    layout: "/producer",
  },
  {
    path: "/productionList",
    component: <ProductionList />,
    name: "Productions List",
    icon: "fa-regular fa-chart-bar fa-xl",
    layout: "/producer",
  },
  {
    path: "/newStatsReceiver",
    component: <NewStatsReceiver />,
    name: "Ny Lunch Statistik",
    icon: "fa-regular fa-chart-bar fa-xl",
    layout: "/receiver",
  },
  {
    path: "/statsRecord",
    component: <StatsRecord />,
    name: "Statistik",
    icon: "fa-solid fa-chart-column fa-xl",
    layout: "/producer",
  },
  {
    path: "/statsRecordReceiver",
    component: <StatsRecordReceiver />,
    name: "Statistik",
    icon: "fa-solid fa-chart-column fa-xl",
    layout: "/receiver",
  },
  {
    path: "/workplan",
    component: <Workplan />,
    name: "Todos",
    icon: "fa-solid fa-list-ul fa-xl",
    layout: "",
  },
  {
    path: "/subKitchen",
    component: <SubKitchen />,
    name: "Mottagningskök",
    icon: "fa-solid fa-kitchen-set fa-xl",
    layout: "/producer",
  },
  {
    path: "/Vikarieparm",
    component: <Vikarieparm />,
    name: "Vikariepärm",
    icon: "fa-regular fa-folder-open fa-xl",
    layout: "/receiver",
  },
  {
    path: "/WorkRoutine",
    component: <WorkRoutine />,
    name: "Jobb rutine",
    icon:"fa-solid fa-business-time fa-xl",
    layout: "/receiver",
  },
  {
    path: "/OrderRoutine",
    component: <OrderRoutine />,
    name: "Beställnings rutine",
    icon: "fa-solid fa-rotate fa-xl",
    layout: "",
  },
  {
    path: "/KitchenRoutine",
    component: <KitchenRoutine />,
    name: "Kökets rutine",
    icon: "fa-solid fa-sink fa-xl",
    layout: "",
  },
  {
    path: "/FoodWaste",
    component: <FoodWaste />,
    name: "Matsvinn",
    icon: "fa-solid fa-recycle fa-xl",
    layout: "/receiver",
  },
  {
    path: "/Message",
    component: <Message />,
    name: "Message",
    icon: "fa-solid fa-comment-dots fa-xl",
    layout: "",
  },
  {
    path: "/DailyMealIngredientsProducer",
    component: <DailyMealIngredientsProducer />,
    name: "DailyMealIngredients",
    icon: "fa-solid fa-utensils fa-xl",
    layout: "/producer",
  },
  {
    path: "/DailyMealIngredientsReceiver",
    component: <DailyMealIngredientsReceiver />,
    name: "DailyMealIngredients",
    icon: "fa-solid fa-utensils fa-xl",
    layout: "/receiver",
  },
  {
    path: "/SpecialKost_production",
    component: <SpecialKost />,
    name: "SpecialKost",
    icon: "fa-solid fa-wheat-awn-circle-exclamation fa-xl",
    layout: "/producer",
  },
  {
    path: "/lunchOrders",
    component: <LunchOrders />,
    name: "Lunch beställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/receiver",
  },
  {
    path: "/unifiedLunchOrders",
    component: <UnifiedLunchOrders />,
    name: "Lunch Beställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/producer",
  },
  {
    path: "/kitchenSetting",
    component: <KitchenSetting />,
    name: "Köksinställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/dataAnalyze",
    component: <DataAnalyze />,
    name: "Data analys",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/newUser",
    component: <NewUser />,
    name: "Ny Användare",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/multiUserNewStat",
    component: <MultiUserNewStat />,
    name: "Enhetlig registrering",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/quantityTemplate",
    component: <QuantityTemplate />,
    name: "Mängdmallen",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/dietSetting",
    component: <SpecialkostSetting />,
    name: "Specialkost registrering",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/admin",
  },
  {
    path: "/menuSetting",
    component: <MenuSetting />,
    name: "Maträtt inställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/menuTemplate",
    component: <MenuTemplate />,
    name: "Menymall",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/sidesTemplate",
    component: <SidesTemplate />,
    name: "Tillbehör inställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/dataAnalyzeAdmin",
    component: <DataAnalyzeAdmin />,
    name: "Data analys",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/newAdmin",
    component: <NewAdmin />,
    name: "Ny områdes admin",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/specialkostType",
    component: <SpecialkostType />,
    name: "Specialkost inställning",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
  {
    path: "/loginTrace",
    component: <LoginTrace />,
    name: "LoginTracer",
    icon:"fa-solid fa-file-pen fa-xl",
    layout: "/superiorAdmin",
  },
];

