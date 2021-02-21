import { FC } from 'react';
import NextErrorComponent from 'next/error';

const NotFound: FC = () => <NextErrorComponent statusCode={404} />;

export default NotFound;
