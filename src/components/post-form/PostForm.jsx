import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";        
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {    //post if all the info related to post
//These are some of the methods we get from useForm. watch--> used for continous monitoring, in forms we dont just use value{} we use setValue coz we using React forms simliarly getValues, and contorl as seen earlier in RTE 

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues:
        {   //All these values we will get when user clicks on edit post.
            Title: post?.Title || "",   // if it exists then show it else show empty
            slug: post?.$id || "",
            Content: post?.Content || "",
            Status: post?.Status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);   //gte userDatra from initalstate    authSlice in store

    const submit = async (data) => {    //When user is submitting or editing(updating) Post

        if (post)   //already post exists
        {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;    //if we have an img then upload that image

            if (file)   //if new file was created/uploaded
            {
                appwriteService.deleteFile(post.Image); //delete the previous image/file id from DB 
            }

             //updatePost requires a slug which will be our post.$id & if in data there exists a file in Image(if image link exists in DB) now then store its file ID or mark it as undefined if not present(do nothing)    
            const dbPost = await appwriteService.updatePost(post.$id, {...data,Image: file ? file.$id : undefined,});

            if (dbPost)
            navigate(`/post/${dbPost.$id}`);    //Nav user to that post
        }
        else    //Means user isnt trying to update old form(post) but create a new one
        {
            const file = data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;      //Upload user file

            if (file) //if he has given a post then set its attribites
            {
                const fileId = file.$id;
                data.Image = fileId;        //Then give image its ID
                                                                
                                                               //here we just need to pass userID
                const dbPost = await appwriteService.createPost({ ...data, UserID: userData.$id });     //this userData we got from store in beginning

                if (dbPost)
                {
                    navigate(`/post/${dbPost.$id}`);    //after submitting we go to post
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {

        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")    //This are rejux we get from Docs or chatGPT
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => { 

            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true }); //so this is for our Slug management  to make slugs unqiue acc to titles and give them proper syntax acc to slugTransform
            }
        });

        return () => subscription.unsubscribe();    //This is for Memory management like freeing up space.
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

            {/* Left Side */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("Title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>

            {/* Right Side */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (  //if post exists then
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.Image)}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("Status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                
            </div>
        </form>
    );
}