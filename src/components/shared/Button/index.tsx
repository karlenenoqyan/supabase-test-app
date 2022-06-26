import React, {useCallback} from 'react';
import classNames from 'classnames';

import {RouterService} from '~/services';

import {IButtonProps} from './types';
import styles from './Button.module.scss';

const Button: React.FC<IButtonProps> = ({
  route,
  onClick,
  children,
  LeftIcon,
  disabled,
  className = '',
  size = 'medium',
  type = 'button',
  variant = 'primary',
}) => {
  const buttonClasses = classNames(
    styles.container,
    styles[`container_${size}`],
    styles[`container_${variant}`],

    {
      [styles.container__left]: !!LeftIcon,
    },
    className,
  );

  const handleLinkClick = useCallback(() => {
    if (route) {
      RouterService.push(route);
    }
  }, [route]);

  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClasses}
      onClick={route ? handleLinkClick : onClick}>
      {!!LeftIcon && <LeftIcon />}

      {children}
    </button>
  );
};

export default Button;
