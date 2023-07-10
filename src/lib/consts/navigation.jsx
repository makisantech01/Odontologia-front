import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faBoxesStacked,
  faUsers,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faChartSimple, faBoxesStacked, faUsers, faQuestion);
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "citas",
    label: "Citas",
    path: "/citas",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
  },
  {
    key: "inventario",
    label: "Inventario",
    path: "/inventario",
    icon: <FontAwesomeIcon icon={faBoxesStacked} />,
  },
  {
    key: "pacientes",
    label: "Pacientes",
    path: "/pacientes",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "support",
    label: "Ayuda y Soporte",
    path: "/soporte",
    icon: <FontAwesomeIcon icon={faQuestion} />,
  },
];
