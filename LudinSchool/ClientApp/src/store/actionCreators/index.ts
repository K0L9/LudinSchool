import * as HomeActions from "../../components/home/actions";
import * as AddNewsActions from "../../components/admin/news/create/actions";

const actions = { ...HomeActions, ...AddNewsActions };

export default actions;
