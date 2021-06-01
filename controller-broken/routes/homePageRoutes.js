// const handlebars = require('handlebars');

// const template = handlebars.templates;

// loading dynamic files part of index.html
router.use(express.static('/views/'));

// router.set('views', 'views/home')
// router.set('view engine', 'handlebars');

// will be serving /view/home/index.handlebars that displays info about the remote control
router.get('/',(req, res) => {
    // res.render('index.handlbars');
    res.send('will add page here one day');
});

module.exports = homePageRoutes;