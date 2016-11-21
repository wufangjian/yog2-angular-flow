
import {getData} from '../model';
import util from '../lib/util';
import config from '../config';

export default (req, res) => {
    res.render('ssp/page/index.tpl', getData({
    	userName: req.session.username,
        config: config
    }));
};