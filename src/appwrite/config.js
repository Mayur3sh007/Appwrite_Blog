import conf from '../conf/conf.js'
import { Client,ID, Databases, Storage, Query } from 'appwrite'

export class Service{
    client = new Client();
    Databases;
    bucket;     //This is just a variable we can name anything not necessary to name Storage

    constructor()                                                
    {                              
        this.client                                             
            .setEndpoint(conf.appwriteURL)                    
            .setProject(conf.appwriteProjectID)
        this.Databases  = new Databases(this.client);   //stores--> ID ,content, img link,title status
        this.bucket = new Storage(this.client);         //Actual Img 
    }

     //These are all the attributes exactly same as we named in appwrite.
    async createPost({Title,Content,Image,Status,UserID,slug}) //When we create a post we get all these attribute with the post
    {
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,   //This is for document ID which will be generated depending on slug passed OR just use ID.unique()
                {
                    Title,
                    Content,
                    Image,
                    Status,
                    UserID,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error",error);
        }
    }
    
    async updatePost(slug,{Title,Content,Image,Status})  // we must provide func with the slug and other attributes we will get as Above
    {
        try {

            return await this.Databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    Image,
                    Status
                }
            )
            
        } catch (error) {
            console.log("Appwrite Service :: update Post :: error",error);
        }
    }

    async deletePost(slug)
    {
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;        //DELETED
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false;
        }
    }

    async getPost(slug)     //Get singlle document/post
    {
        try {

            return await this.Databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        }catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("Status","active")])  //  queries is just a variable name , so we R getting all the posts whose status is active.
    {
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,    //U can just write what ever we did in queries here directly
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error",error);
            return false;
        }
    }



    //Files upload Service
    async uploadFile(file)
    {
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error);
        }
    }

    async deleteFile(fileId)
    {
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )   
            return true;

        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(conf.appwriteBucketID,fileId);
    }

}

const appwriteService = new Service();  //we create its object and export the obj so we dont have to further create it
export default appwriteService