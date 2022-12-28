import React from "react";
import Apply from "./Apply";
import Shortlist from "./Shortlist";
import TLDInvitation from "./TLDInvitation";
import TLDInvitationReminder from "./TLDInvitationReminder";
import ORVIInvitation from "./ORVIInvitation";
import ORVIInvitationReminder from "./ORVIInvitationReminder";
import MCUInvitation from "./MCUInvitation";
import MCUInvitationReminder from "./MCUInvitationReminder";
import InterviewInvitation from "./InterviewInvitation";
import InterviewInvitationUpdate from "./InterviewInvitationUpdate";
import InterviewInvitationConfirmed from "./InterviewInvitationConfirmed";
import InterviewInvitationDenied from "./InterviewInvitationDenied";
import InterviewInvitationReminder from "./InterviewInvitationReminder";
import Offering from "./Offering";
import OfferingReminder from "./OfferingReminder";
import Hired from "./Hired";
import Gagal from "./Gagal";

export default function StatusLamaran({ variant }) {
  //   return <Apply />;
  return variant === "Apply" ? (
    <Apply />
  ) : variant === "Shortlist" ? (
    <Shortlist />
  ) : variant === "TLD Invitation" ? (
    <TLDInvitation />
  ) : variant === "TLD Invitation Reminder" ? (
    <TLDInvitationReminder />
  ) : variant === "ORVI Invitation" ? (
    <ORVIInvitation />
  ) : variant === "ORVI Invitation Reminder" ? (
    <ORVIInvitationReminder />
  ) : variant === "MCU Invitation" ? (
    <MCUInvitation />
  ) : variant === "MCU Invitation Reminder" ? (
    <MCUInvitationReminder />
  ) : variant === "Interview Invitation" ? (
    <InterviewInvitation />
  ) : variant === "Interview Invitation Update" ? (
    <InterviewInvitationUpdate />
  ) : variant === "Interview Invitation Confirmed" ? (
    <InterviewInvitationConfirmed />
  ) : variant === "Interview Invitation Denied" ? (
    <InterviewInvitationDenied />
  ) : variant === "Interview Invitation Reminder" ? (
    <InterviewInvitationReminder />
  ) : variant === "Offering" ? (
    <Offering />
  ) : variant === "OfferingReminder" ? (
    <OfferingReminder />
  ) : variant === "Hired" ? (
    <Hired />
  ) : (
    variant === "Gagal" && <Gagal />
  );
}
