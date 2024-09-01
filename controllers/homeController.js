const homeController = {
    async home_get(req, res) {
        res.render('home', {
            layout: 'layouts/main-layout',
            route: 'home',
            title: 'لوحة التحكم'
        });
    },
};

export default homeController;
