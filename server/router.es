// export default (router) => {
// 	router.route(/^\/(?!api\/|logout).*/).get(router.action('index'));
// };



/**
 * @file Router Configuration file
 * @author wangwenfei
 */
export default (router) => {

    router.all('*', (req, res, next) => {
        next();
    });

    router
        .route(/^\/(?!api\/|logout).*/)
        .get(router.action('index'));
};
