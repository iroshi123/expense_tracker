import { TagForm } from "@/components/tag_form";
import TagListTable from "@/components/tag_list";



export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Tag</h1>
      <TagForm/>
      <h2 className="text-lg font-semibold mt-10 mb-2">All Tags</h2>
     <TagListTable /> 
    </div>
  );
}
