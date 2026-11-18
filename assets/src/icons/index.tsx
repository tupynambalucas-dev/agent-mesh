/**
 * CodeCanvas - Canonical Icon System
 * Powered by react-icons, managed by @studio.
 */

import React from 'react';
import type { IconType } from 'react-icons';
import {
  FaList,
  FaUsers,
  FaCarrot,
  FaBoxOpen,
  FaArrowLeft,
  FaSave,
  FaPen,
  FaTrash,
  FaSync,
  FaExclamationTriangle,
  FaTimes,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
  FaSearch,
  FaGithub,
  FaCircle,
  FaUserCircle,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';

import {
  FaChartSimple,
  FaGear,
  FaArrowRightFromBracket,
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaTriangleExclamation,
} from 'react-icons/fa6';

export type { IconType };

/**
 * Prop types for the Canonical Icon component.
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: IconType;
  size?: string | number;
  color?: string;
  title?: string;
  flip?: 'horizontal' | 'vertical' | 'both';
}

/**
 * Canonical Icon component for CodeCanvas.
 * Wraps react-icons to maintain a consistent interface across the monorepo.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ icon: IconComponent, size, color, title, flip, style, ...props }, ref) => {
    // Map FontAwesome sizes to react-icons sizes
    const sizeMap: Record<string, string> = {
      xs: '0.75em',
      sm: '0.875em',
      lg: '1.25em',
      xl: '1.5em',
      '2xl': '2em',
      '1x': '1em',
      '2x': '2em',
      '3x': '3em',
      '4x': '4em',
      '5x': '5em',
    };

    const finalSize = typeof size === 'string' ? (sizeMap[size] ?? size) : size;

    // Handle flip
    const transform =
      flip === 'horizontal'
        ? 'scaleX(-1)'
        : flip === 'vertical'
          ? 'scaleY(-1)'
          : flip === 'both'
            ? 'scale(-1, -1)'
            : undefined;

    const finalStyle: React.CSSProperties = {
      ...style,
      transform: transform ?? style?.transform,
      display: 'inline-flex',
    };

    return (
      <span ref={ref} style={finalStyle} className="monorepo-icon-wrapper">
        <IconComponent {...props} size={finalSize} color={color}>
          {title !== undefined && <title>{title}</title>}
        </IconComponent>
      </span>
    );
  },
);

Icon.displayName = 'Icon';

// Re-export specific icons as "fa" compatible names if needed,
// but it's better to use the react-icons naming convention.
// To minimize changes in instance/web, we'll map them to the old names for now.
export {
  FaList as faList,
  FaUsers as faUsers,
  FaCarrot as faCarrot,
  FaChartSimple as faChartSimple,
  FaGear as faGear,
  FaArrowRightFromBracket as faArrowRightFromBracket,
  FaBoxOpen as faBoxOpen,
  FaArrowLeft as faArrowLeft,
  FaSave as faSave,
  FaPen as faPen,
  FaTrash as faTrash,
  FaSync as faSync,
  FaExclamationTriangle as faExclamationTriangle,
  FaTimes as faTimes,
  FaCalendarAlt as faCalendarAlt,
  FaChevronLeft as faChevronLeft,
  FaChevronRight as faChevronRight,
  FaEye as faEye,
  FaEyeSlash as faEyeSlash,
  FaCircleCheck as faCircleCheck,
  FaCircleExclamation as faCircleExclamation,
  FaCircleInfo as faCircleInfo,
  FaTriangleExclamation as faTriangleExclamation,
  FaSearch as faSearch,
  FaGithub as faGithub,
  FaCircle as faCircle,
  FaUserCircle as faUser,
  FaShoppingCart as faShoppingCart,
  FaPlus as faPlus,
  FaMinus as faMinus,
};

// Export entire sets if needed
export * as FaIcons from 'react-icons/fa';
export * as Fa6Icons from 'react-icons/fa6';
export * as MdIcons from 'react-icons/md';
export * as IoIcons from 'react-icons/io5';
