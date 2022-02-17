import * as HomeActions from "../../components/home/actions";
// import * as AddNewsActions from "../../components/admin/news/create/actions";
import * as NewsCategoryActions from "../../components/admin/news/newsCategories/actions";

const actions = { ...HomeActions, ...NewsCategoryActions };

export default actions;
