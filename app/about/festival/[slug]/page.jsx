export const metadata = {
  title: "Festival Gallery | NextGen",
  description: "Festival moments at NextGen",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import FestivalGallery from "../../../components/about/FestivalGallery";

export default function FestivalSlugPage({ params }) {
  return <FestivalGallery params={params} />;
}
