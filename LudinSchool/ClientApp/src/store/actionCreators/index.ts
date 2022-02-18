import * as AdminNewsActions from "../../components/admin/news/actions";
import * as NewsCategoryActions from "../../components/admin/news/newsCategories/actions";

const actions = { ...AdminNewsActions, ...NewsCategoryActions };

export default actions;
