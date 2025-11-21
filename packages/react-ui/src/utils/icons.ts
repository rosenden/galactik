/**
 * Font Awesome Icons Helper
 * 
 * Ce fichier centralise l'import et l'export des icônes Font Awesome Pro
 * utilisées dans les composants du design system.
 * 
 * @example
 * ```tsx
 * import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 * import { icons } from '@galactik/react-ui/utils/icons';
 * 
 * <Button iconLeft={<FontAwesomeIcon icon={icons.faPlus} />}>
 *   Ajouter
 * </Button>
 * ```
 */

import {
  // Actions
  faPlus,
  faMinus,
  faCheck,
  faTimes,
  faTrash,
  faEdit,
  faSave,
  faCopy,
  faPaste,
  faCut,
  
  // Navigation
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  
  // Media
  faPlay,
  faPause,
  faStop,
  faForward,
  faBackward,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  
  // Communication
  faEnvelope,
  faPaperPlane,
  faComment,
  faComments,
  faPhone,
  faBell,
  
  // Social
  faHeart,
  faStar,
  faShare,
  faThumbsUp,
  faThumbsDown,
  
  // Files & Documents
  faFile,
  faFileAlt,
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFolder,
  faFolderOpen,
  faDownload,
  faUpload,
  faCloudDownload,
  faCloudUpload,
  
  // User & Account
  faUser,
  faUserCircle,
  faUsers,
  faUserPlus,
  faUserMinus,
  faSignIn,
  faSignOut,
  
  // Settings & Tools
  faCog,
  faCogs,
  faWrench,
  faTools,
  faSliders,
  
  // View & Display
  faEye,
  faEyeSlash,
  faSearch,
  faFilter,
  faSort,
  faList,
  faGrid,
  faTable,
  
  // Status & Info
  faInfo,
  faInfoCircle,
  faQuestion,
  faQuestionCircle,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  
  // Calendar & Time
  faCalendar,
  faCalendarAlt,
  faClock,
  faHourglass,
  
  // Shopping & Commerce
  faShoppingCart,
  faShoppingBag,
  faCreditCard,
  faMoneyBill,
  
  // Misc
  faHome,
  faLock,
  faUnlock,
  faKey,
  faMapMarker,
  faGlobe,
  faLink,
  faUnlink,
  faPrint,
  faCamera,
  faImage,
  faVideo,
} from '@fortawesome/pro-regular-svg-icons';

// Export organisé par catégorie
export const icons = {
  // Actions
  faPlus,
  faMinus,
  faCheck,
  faTimes,
  faTrash,
  faEdit,
  faSave,
  faCopy,
  faPaste,
  faCut,
  
  // Navigation
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  
  // Media
  faPlay,
  faPause,
  faStop,
  faForward,
  faBackward,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  
  // Communication
  faEnvelope,
  faPaperPlane,
  faComment,
  faComments,
  faPhone,
  faBell,
  
  // Social
  faHeart,
  faStar,
  faShare,
  faThumbsUp,
  faThumbsDown,
  
  // Files & Documents
  faFile,
  faFileAlt,
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFolder,
  faFolderOpen,
  faDownload,
  faUpload,
  faCloudDownload,
  faCloudUpload,
  
  // User & Account
  faUser,
  faUserCircle,
  faUsers,
  faUserPlus,
  faUserMinus,
  faSignIn,
  faSignOut,
  
  // Settings & Tools
  faCog,
  faCogs,
  faWrench,
  faTools,
  faSliders,
  
  // View & Display
  faEye,
  faEyeSlash,
  faSearch,
  faFilter,
  faSort,
  faList,
  faGrid,
  faTable,
  
  // Status & Info
  faInfo,
  faInfoCircle,
  faQuestion,
  faQuestionCircle,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  
  // Calendar & Time
  faCalendar,
  faCalendarAlt,
  faClock,
  faHourglass,
  
  // Shopping & Commerce
  faShoppingCart,
  faShoppingBag,
  faCreditCard,
  faMoneyBill,
  
  // Misc
  faHome,
  faLock,
  faUnlock,
  faKey,
  faMapMarker,
  faGlobe,
  faLink,
  faUnlink,
  faPrint,
  faCamera,
  faImage,
  faVideo,
};

// Export par défaut pour une utilisation simple
export default icons;
