import React, {forwardRef, useCallback, useRef, useState} from 'react';
import classNames from 'classnames';
import ReactImageCrop, {Crop, PixelCrop} from 'react-image-crop';

import {Typography} from '~/components';
import {useDebounceEffect} from '~/hooks';
import {centerAspectCrop, imgPreview} from '~/utils';

import {IInputProps} from '../Input/types';
import inputStyles from '../Input/Input.module.scss';

import styles from './ImageUpload.module.scss';

const ImageUpload = forwardRef<any, IInputProps>(
  (
    {
      name,
      label,
      error,
      disabled,
      onChange,
      className = '',
      innerClassName = '',
      labelClassName = '',
      ...rest
    },
    ref,
  ) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const [crop, setCrop] = useState<Crop>();
    const [imgSrc, setImgSrc] = useState('');
    const [previewSrc, setPreviewSrc] = useState('');
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const inputClasses = classNames(inputStyles.container, className, {
      [inputStyles.container__error]: !!error,
    });

    const inputInnerClasses = classNames(inputStyles.container__inner, {
      [innerClassName]: innerClassName,
      [inputStyles.container__inner__error]: !!error,
      [inputStyles.container__inner_disabled]: disabled,
    });

    const labelClasses = classNames(inputStyles.container__label, {
      [labelClassName]: labelClassName,
    });

    useDebounceEffect(
      async () => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current) {
          const previewImageSrc = await imgPreview(
            imgRef.current,
            completedCrop,
          );

          setPreviewSrc(previewImageSrc);
        }
      },
      100,
      [completedCrop],
    );

    const handleFileInputChange = useCallback(
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: {files},
        } = event;

        if (files && files.length) {
          const reader = new FileReader();

          setCrop(undefined);

          reader.addEventListener('load', () => {
            setImgSrc(reader.result?.toString() || '');

            if (onChange) {
              onChange(event);
            }
          });
          reader.readAsDataURL(files[0]);
        }
      },
      [onChange],
    );

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const {width, height} = event.currentTarget;

      setCrop(centerAspectCrop(width, height, 16 / 9));
    };

    return (
      <>
        <label htmlFor={name} className={labelClasses}>
          {label}
          <div className={inputInnerClasses}>
            <input
              {...rest}
              id={name}
              ref={ref}
              name={name}
              type="file"
              accept="image/*"
              disabled={disabled}
              className={inputClasses}
              onChange={handleFileInputChange}
            />
          </div>
          {error && (
            <Typography
              type="Small"
              className={inputStyles.container__error__text}>
              {error}
            </Typography>
          )}
        </label>

        <div className={styles.container__preview}>
          {imgSrc && (
            <ReactImageCrop
              crop={crop}
              aspect={16 / 9}
              onComplete={(c) => setCompletedCrop(c)}
              onChange={(_, percentCrop) => setCrop(percentCrop)}>
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop me"
                onLoad={handleImageLoad}
              />
            </ReactImageCrop>
          )}

          {previewSrc && (
            <img
              alt="Crop preview"
              src={previewSrc}
              className={styles.container__preview__image}
            />
          )}
        </div>
      </>
    );
  },
);

export default ImageUpload;
