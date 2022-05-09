import {HandledRoute, registerPlugin, ScullyConfig, setPluginConfig} from '@scullyio/scully';
const { MinifyHtml } = require('scully-plugin-minify-html');
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
require('@notiz/scully-plugin-lazy-images');

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'

const postRenderers = [MinifyHtml, 'lazyImages', 'seoHrefOptimize'];

const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: 'https://gamma.stream',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: ['/404'],
  // routes: {
  //   '/products/:productId': {
  //     changeFreq: 'daily',
  //     priority: '0.9',
  //     sitemapFilename: 'sitemap-products.xml',
  //   },
  // },
});

const routeList = ['/']

registerPlugin(
    'routeProcess',
    'removeUserIds',
    (routes: HandledRoute[]): Promise<HandledRoute[]> => {
      return Promise.resolve(routes.filter(r => routeList.includes(r.route)));
    });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "WebApp",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  defaultPostRenderers: postRenderers,
  routes: {
  },
  appPort: 4200,
  proxyConfig: './proxy.conf.js'
};
