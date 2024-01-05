import '../styles/main.scss';
import 'react-linear-gradient-picker/dist/index.css';
import 'rc-color-picker/dist/rc-color-picker.css';
import '../ui/utils/globals';
import 'react-awesome-query-builder/lib/css/styles.css';

import Head from 'next/head';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';

import Auth from '../lib/auth';
import ProgressBar from '../lib/ProgressBar';
import Settings from '../lib/settings';
import Toast from '../lib/toast';
import settings from '../settings';

function App({ Component, router, pageProps }) {
    return (
        <>
            <Script src="/tinymce/tinymce.min.js" />
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#223a79" />
                <title>{settings.meta.title}</title>
                <meta name="description" content={settings.meta.description} />
            </Head>
            <DefaultSeo
                openGraph={{
                    type: 'website',
                    locale: router.locale,
                    url: settings.meta.rootUrl,
                    site_name: settings.meta.title
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image'
                }}
            />
            <ProgressBar>
                <Toast>
                    <Auth>
                        <Settings>
                            <Component {...pageProps} />
                        </Settings>
                    </Auth>
                </Toast>
            </ProgressBar>
        </>
    );
}

export default App;
