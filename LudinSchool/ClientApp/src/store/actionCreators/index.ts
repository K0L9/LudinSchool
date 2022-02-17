import * as HomeActions from "../../components/admin/news/list/actions";
// import * as AddNewsActions from "../../components/admin/news/create/actions";
import * as NewsCategoryActions from "../../components/admin/news/newsCategories/actions";

const actions = { ...HomeActions, ...NewsCategoryActions };

export default actions;
