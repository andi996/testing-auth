export class endpoints {
  // LANDING
  static popularSearch = "v1/popular_searches";
  static blog = "v1/blogs";
  static autoComplete = "v1/search/autocomplete";
  static masterLocation = "v1/master_locations";
  // LOGIN
  static Login = "v1/login";
  static CheckUser = "v1/user/check";
  static LupaPassword = "v1/forgot-password";
  // MASTER
  static masterJobFunctions = "v1/master_job_functions";
  static MasterCountries = "v1/master_countries";
  // HOME
  static savePreferensi = "v1/save/user/preferences";
  static preferensi = "v1/user/preferences/";
  static preferensiOpportunities = "v2/search/opportunities";
  static rekomendasiOpportunities = "v2/opportunity/recommendation";
  static banner = "v1/banner";
  //Company
  static company = "v1/company";
  // SETTING
  static SaveNewPassword = "v1/user/password/update";
  static SendEmailOTP = "/v1/email_verification/send";
  static VerifikasiEmailOTP = "/v1/email_verification/verify";
  static SaveNewEmail = "v1/user/email/update";
  // DASHBOARD
  static dashboardApplications = "v2/user/applications";
  static dashboardInterviews = "v1/interview";
  static getUserNotif = "v1/user-notification/";
  // REGISTER
  static checkUserEmail = `v1/check/users/by/email`;
  static sendEmailOTP = `v1/email_verification/send`;
  static sendWhatsappOTP = `v1/send/verification`;
  static verifyEmailOTP = `v1/email_verification/verify`;
  static verifyWhatsappOTP = `v1/verify/user/phone`;
  static register = `v1/register`;
}
