export class endpoints {
  // LANDING
  static popularSearch = "v1/popular_searches";
  static blog = "v1/blogs";
  static autoComplete = "v1/search/autocomplete";
  static masterLocation = "v1/master_locations";
  // LOGIN
  static Login = "v1/login";
  static getOtpLoginNew = "v1/login/otp/method";
  static verifyOtpLoginNew = "v1/login/verification";
  static CheckUser = "v1/user/check";
  static DataUserLupaPassword = "v1/forgot-password";
  static ChangeMethodOtpLupaPassword = "v1/forgot-password/otp/method";
  static verifyOTPLupaPassword = "v1/forgot-password/verification";
  static UpdateForgotPassword = "v1/forgot-password/new-password";

  // MASTER
  static masterJobPositions = "v1/search/master_job_title";
  static masterJobFunctions = "v1/master_job_functions";
  static MasterCountries = "v1/master_countries";
  static MasterProvinces = "v1/master_provinces";
  static MasterProvinces = "v1/master_provinces";
  static MasterIndustries = "v1/master_industries";
  static MasterJobLevels = "v1/master_job_levels";
  static MasterDegrees = "v1/master_degrees";
  static MasterMajors = "v1/master_majors";
  static MasterRegencies = "/v1/master_regencies";

  // HOME
  static savePreferensi = "v1/save/user/preferences";
  static preferensi = "v1/user/preferences/";
  static preferensiOpportunities = "v2/search/opportunities";
  static rekomendasiOpportunities = "v2/opportunity/recommendation";
  static banner = "v1/banner";
  static bannerOpportunities = "v1/banner/choice-opportunity";
  static choiceOpportunities = "v1/opportunity/choice";
  static updateCountBanner = "v1/banner/update-click-count";
  static favoriteIndustries = "v1/most-company-vacancies";
  static mostOpportunities = "v1/most-job-vacancies";

  //COMPANY
  static company = "v1/company";
  static report = "v1/fraud/company-report";
  static toggle = "v2/user/company/subscribe/toggle";

  // SETTING
  static SaveNewPassword = "v1/user/change-password";
  static SendEmailOTP = "/v1/email_verification/send";
  static VerifikasiEmailOTP = "/v1/email_verification/verify";
  static SaveNewEmail = "v1/user/email/update";
  static UserNotif = "v1/user-notification";
  static GetHistoryLogin = "v1/user-device";
  static LogoutSingleDevice = "v1/user-device/delete";
  static LogoutAllDevice = "v1/user-device/delete-all";
  static getOtpChangePhone = "v1/send/verification";
  static verifyOTPChangePhone = "v1/verify/user/phone";
  static saveChangePhone = "v1/user/phone/update";
  static NonAktifAkun = "v1/user/nonactive-account";
  static DeleteAkun = "v1/user/delete-account";

  // UPDATE LOGIN HISTORY
  static LoginUpdateHistory = "v1/user-device/update";

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

  // LOWONGAN SIMPAN
  static PerusahaanDisubscibe = "v1/user/company/subscribed";
  static getListLowonganDisimpan = "v2/user/save_opportunity/list";

  // PROFILE
  static profile = `/v1/user/profile`;
  static updateProfile = `v1/user/profile/upsert`;
  static uploadAvatar = `v1/user/avatar/upload`;
  static uploadFile = `v1/user/attachment/create`;
  static deleteFile = `v1/user/attachment/delete`;
  static setPriority = `v1/user/attachment/set-priority`;
  static addWorkExperience = `v1/user/workexperience/insert`;
  static updateWorkExperience = `v1/user/workexperience/update`;
  static deleteWorkExperience = `v1/user/workexperience/delete`;
  static addEducation = `v2/user/education/insert`;
  static updateEducation = `v2/user/education/update`;
  static deleteEducation = `v1/user/education/delete`;
  static addSkill = `v1/user/skill/upsert`;
  static deleteSkill = `v1/user/skill/delete-all`;
  static addLanguage = `v1/user/language/upsert`;
  static deleteLanguage = `v1/user/language/delete`;
  static addCertification = `v1/user/certification/upsert`;
  static addOrganization = `v1/user/organizationexperience/upsert`;
  static deleteOrganization = `v1/user/organizationexperience/delete`;
  static addJournal = `v1/user/journal`;
  static addReferral = `v1/user/referral`;
  static addPortofolio = `v1/user/portofolio`;
  static cvGenerator = `v1/user/cv/generator`;
  static CvPayload = `/v1/user/cv/payload`;

  // OPPORTUNITY
  static opportunity = `v1/opportunity/detail`;
  static saveOpportunity = `v1/user/save_opportunity`;
  static applyOpportunity = `v2/opportunity/apply`;
  static similarJobs = `v2/search/opportunities`;
  static subscribeCompany = `v2/user/company/subscribe/toggle`;
  static visitedCount = `v1/opportunity/visited-count`;

  // STATUS LAMARAN
  static attend = `/v1/interview/attend`;
  static readApplications = `/v1/user/applications/read`;

  //NOTIFICATION
  static totalUnread = "v2/notification/total-unread";
  static notification = "v1/notification";
  static readNotif = "v1/notification/read-by-categories";
  static readNotifInterview = "v1/user/applications/read-counter";

  //SEARCH
  static search = "v2/search/opportunities";
  static searchLocation = "v1/location/search";
  static searchJobLocation = "v1/job_function/search";
  static searchIndustry = "v1/industry/search";
  static degree = "v1/master_degrees?locale=id";
  static companySubs = "v1/user/company/subscribed";
}
