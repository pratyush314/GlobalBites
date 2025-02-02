import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { editMenu } = useMenuStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>();
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = menuSchema.safeParse(input);
    if (!res.success) {
      const fieldErrors = res.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      setEditOpen(false);
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await editMenu(selectedMenu._id!, formData);
    } catch (error) {
      console.log(error);
    }
    setEditOpen(false);
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-1 items-center">
          <DialogTitle className="md:text-2xl">Edit Menu</DialogTitle>
          <DialogDescription className="md:text-lg text-center">
            Update your menu to keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3" onSubmit={submitHandler}>
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:border-none"
              name="name"
              type="text"
              value={input?.name}
              onChange={changeEventHandler}
              placeholder="Enter menu name"
            />
            {errors && (
              <span className="text-sm text-red-600 font-medium">
                {errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input
              name="description"
              type="text"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter menu description"
              className="focus-visible:ring-0 focus-visible:border-none"
            />
            {errors && (
              <span className="text-sm text-red-600 font-medium">
                {errors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Price in (Rupees)</Label>
            <Input
              name="price"
              type="number"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter menu price"
              className="focus-visible:ring-0 focus-visible:border-none"
            />
            {errors && (
              <span className="text-sm text-red-600 font-medium">
                {errors.price}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Upload Menu Image</Label>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setInput({
                  ...input,
                  image: e.target.files?.[0] || undefined,
                })
              }
              className="cursor-pointer focus-visible:ring-0 focus-visible:border-none"
            />
            {errors && (
              <span className="text-sm text-red-600 font-medium">
                {errors.image?.name}
              </span>
            )}
          </div>
          <DialogFooter className="mt-5">
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-orange hover:bg-hoverOrange w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Editing Menu ...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
