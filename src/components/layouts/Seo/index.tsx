import React from 'react';
import Head from 'next/head';

import {Header} from '~/containers';
import {Typography} from '~/components';

import {ISeoProps} from './types';

const Seo: React.FC<ISeoProps> = ({
  title,
  children,
  childrenOnly,
  metaDescription,
  showHeader = true,
}) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Head>

    {showHeader && <Header />}

    {childrenOnly ? (
      children
    ) : (
      <div className="container">
        <div className="mb-20">
          <Typography tagName="h1" type="Extra" variant="Heading">
            {title}
          </Typography>
        </div>

        {children}
      </div>
    )}
  </React.Fragment>
);

export default Seo;
