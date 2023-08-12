import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartSimple,
  faBoxesStacked,
  faUsers,
  faUser,
  faQuestion,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(
  faChartSimple,
  faBoxesStacked,
  faUsers,
  faQuestion,
  faNotesMedical,
  faUser
);
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

export const USER_SIDEBAR_LINKS = [
  {
    key: "turnos",
    label: "Turnos",
    path: "/citas",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
  },
  {
    key: "Datos Personales",
    label: "Datos Personales",
    path: "/datos",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    key: "Historial Médico",
    label: "Historial Médico",
    path: "/historial",
    icon: <FontAwesomeIcon icon={faNotesMedical} />,
  },
];
// Esto es un comentario random
