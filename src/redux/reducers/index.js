import { combineReducers } from "redux";
import { EventReducer } from "./EventReducer";
import { AutocompleteSearch, Blog, PopularSearch } from "./LandingReducer";
import { ProfileReducer } from "./ProfileReducer";
import { SelectFilterReducer } from "./SelectFilterReducer";
import { LoginReducer } from "./LoginReducer";
import { Opportunity } from "./OpportunityReducer";
import { StatusLamaran } from "./StatusLamaranReducer";
import {
  MasterCountries,
  MasterLocations,
  MasterJobFunctions,
} from "./MasterReducer";
import {
  BannerReducer,
  PreferensiOpportunitiesReducer,
  PreferensiReducer,
  RekomendasiOpportunitiesReducer,
} from "./HomeReducer";
import { DashboardApplications, DashboardInterviews } from "./DashboardReducer";
import { CompanyReducer } from "./CompanyReducer";

export default combineReducers({
  login: LoginReducer,
  profile: ProfileReducer,
  selectFilter: SelectFilterReducer,
  event: EventReducer,
  popularSearch: PopularSearch,
  blogs: Blog,
  autocompleteSearch: AutocompleteSearch,
  opportunity: Opportunity,
  masterCountries: MasterCountries,
  masterLocations: MasterLocations,
  masterJobFuntions: MasterJobFunctions,
  preferensi: PreferensiReducer,
  preferensiOpportunities: PreferensiOpportunitiesReducer,
  rekomendasiOpportunities: RekomendasiOpportunitiesReducer,
  banners: BannerReducer,
  company: CompanyReducer,
  statusLamaran: StatusLamaran,
  dashboardApplications: DashboardApplications,
  dashboardInterviews: DashboardInterviews,
});
