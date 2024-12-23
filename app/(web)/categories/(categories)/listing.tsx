import { CategoryList } from "~/components/web/categories/category-list";
import { findCategories } from "~/server/web/categories/queries";

export const CategoryListing = async () => {
  const categories = await findCategories({});
  console.log(categories);
  return <CategoryList categories={categories} />;
};
