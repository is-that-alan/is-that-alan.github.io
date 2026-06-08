import ExperienceDetail from "@/components/experience-detail";
import { getExperience } from "@/lib/experience";

export default function NanFungPage() {
  return <ExperienceDetail role={getExperience("nan-fung")!} />;
}
