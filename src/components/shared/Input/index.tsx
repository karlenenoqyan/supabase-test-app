import React, {forwardRef, useMemo, useState, useCallback} from 'react';
import classNames from 'classnames';

import {Typography} from '~/components';

import {IInputProps} from './types';
import styles from './Input.module.scss';

const Input = forwardRef<any, IInputProps>(
  (
    {
      name,
      label,
      error,
      disabled,
      RightIcon,
      RightToggledIcon,
      placeholder,
      type = 'text',
      className = '',
      innerClassName = '',
      labelClassName = '',
      ...rest
    },
    ref,
  ) => {
    const [isToggledIcon, setIsToggledIcon] = useState(false);

    const inputClasses = classNames(styles.container, className, {
      [styles.container__error]: !!error,
      [styles.container_with_icon]: !!RightIcon,
    });

    const inputInnerClasses = classNames(styles.container__inner, {
      [innerClassName]: innerClassName,
      [styles.container__inner__error]: !!error,
      [styles.container__inner_disabled]: disabled,
    });

    const labelClasses = classNames(styles.container__label, {
      [labelClassName]: labelClassName,
    });

    const togglePasswordVisiblity = useCallback(() => {
      if (RightToggledIcon) {
        setIsToggledIcon(!isToggledIcon);
      }
    }, [RightToggledIcon, isToggledIcon]);

    const RightIconComponent = useMemo(
      () =>
        (RightIcon && RightToggledIcon
          ? isToggledIcon
            ? RightToggledIcon
            : RightIcon
          : RightIcon) as React.FC<React.SVGProps<SVGSVGElement>>,
      [RightIcon, RightToggledIcon, isToggledIcon],
    );

    return (
      <label htmlFor={name} className={labelClasses}>
        {label}
        <div className={inputInnerClasses}>
          <input
            {...rest}
            id={name}
            ref={ref}
            name={name}
            autoComplete="off"
            disabled={disabled}
            className={inputClasses}
            placeholder={placeholder}
            type={isToggledIcon ? 'text' : type}
          />
          {RightIcon && (
            <RightIconComponent
              role="button"
              className={styles.container__right_icon}
              onClick={togglePasswordVisiblity}
              style={{
                cursor: RightToggledIcon ? 'pointer' : 'auto',
              }}
            />
          )}
        </div>

        {error && (
          <Typography type="Small" className={styles.container__error__text}>
            {error}
          </Typography>
        )}
      </label>
    );
  },
);

export default Input;
