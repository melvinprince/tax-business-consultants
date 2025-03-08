import EmpoweringBuiness from "@/components/services/EmpoweringBuiness";
import ServiceBox from "@/components/services/ServiceBox";
import ServiceExplanations from "@/components/services/ServiceExplanations";
import ServicesBanner from "@/components/services/ServicesBanner";
import ServicesReview from "@/components/services/ServicesReview";

export default function Services() {
  return (
    <div>
      <ServicesBanner />
      <EmpoweringBuiness />
      <ServiceExplanations />
      <ServicesReview />
    </div>
  );
}
