
import { Category, Tag } from "@prisma/client";
import { Tags } from "lucide-react";
import ChangeTagName from "./tag_edit_form";
import { DeleteTagButton } from "./delete_tag_button";
import { getAllTags } from "@/app/action/tag";


interface TagListTableProps {
  tags: Tag[];
}


export default async function TagListTable() {

    const tags = await getAllTags();

  return (
    <div className="mt-6 overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>            
            <th className="px-6 py-3 text-left font-semibold">Created At</th>
            <th className="px-6 py-3 text-left font-semibold">Updated At</th>
            <th className="px-6 py-3 text-left font-semibold">Tag Name</th>
            <th className="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td className="px-6 py-4">
                {new Date(tag.CreateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {new Date(tag.UpdateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">{tag.name}</td>
              <td className="flex gap-2">
                {tag ? <ChangeTagName tag={tag} /> : <></>}
                {tag ? <DeleteTagButton id={tag?.id} /> : <></>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

