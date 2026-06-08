import ExperienceDetail from "@/components/experience-detail";
import { getExperience } from "@/lib/experience";

export default function PremialabPage() {
  return <ExperienceDetail role={getExperience("premialab")!} />;
}
