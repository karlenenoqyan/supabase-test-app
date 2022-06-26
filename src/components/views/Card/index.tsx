import Image from 'next/image';
import React from 'react';

import {Link} from '~/components';

import {ICardProps} from './types';
import styles from './Card.module.scss';

const Card: React.FC<ICardProps> = ({id, text, src}) => (
  <Link to={`/project/${id}`}>
    <div className={styles.container}>
      <div className={styles.container__image}>
        <Image src={src} alt={text} layout="fill" />
      </div>
      <span className={styles.container__text}>{text}</span>
    </div>
  </Link>
);

export default Card;
