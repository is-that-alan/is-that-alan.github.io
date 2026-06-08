import ExperienceDetail from "@/components/experience-detail";
import { getExperience } from "@/lib/experience";

export default function SocieteGeneralePage() {
  return <ExperienceDetail role={getExperience("societe-generale")!} />;
}
