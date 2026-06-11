import ExperienceDetail from "@/components/experience-detail";
import { getExperience } from "@/lib/experience";

export default function StudentHubsPage() {
  return <ExperienceDetail role={getExperience("student-hubs")!} />;
}
