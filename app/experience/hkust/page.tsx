import ExperienceDetail from "@/components/experience-detail";
import { getExperience } from "@/lib/experience";

export default function HkustPage() {
  return <ExperienceDetail role={getExperience("hkust")!} />;
}
