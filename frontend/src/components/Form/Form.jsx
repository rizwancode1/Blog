import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "../compIndex";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios from "../../BackendService/useAxios";

export default function Form({ article }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const axiosInstance = useAxios();

  const { register, handleSubmit, watch, setValue, control, getValues ,formState: { errors } } =
    useForm({
      defaultValues: {
        title: article?.title || "",
        slug: article?.slug || "",
        content: article?.content || "",
        author_id: userData?.id || "", // Ensure userData is available before accessing its properties
      },
    });


    const submit = async (data) => {
      try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('author_id', userData?.id || "");
    
        // Check if a new image is selected
        if (data.featured_image[0]) {
          formData.append('featured_image', data.featured_image[0]);
        }
    
        if (article) {
          
          const response = await axiosInstance.put(`articles/update/${article.id}/`, formData ,);
          if (response){
            navigate(`/detail/${data.slug}`)

          }

        } else {
          const response = await axiosInstance.post(`articles/create/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          if (response){
            navigate(`/detail/${data.slug}`)
          }
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    };
    
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" encType="multipart/form-data">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
         {errors.title && <p className='text-red-600 mt-1'>Please enter a title..</p>}
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
         {errors.content && <p className='text-red-600 mt-1'>Please write some text here..</p>}
      </div>
      <div className="w-1/3 px-2">
      {article && (
          <div className="w-full mb-4">
            <img
              src={article.featured_image}
              alt={article.title}
              className="rounded-lg"
            />
          </div>
        )}
        
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featured_image", { required: !article })}
        />
         
      
       <div className="my-2">
       <Button
          type="submit"
          bgColor={article ? "bg-green-500" : undefined}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {article ? "Update" : "Submit"}
        </Button>
       </div>
      </div>
    </form>
  );
}
