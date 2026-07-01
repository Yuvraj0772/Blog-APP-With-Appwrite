import conf from '../conf/conf.js'

import { Client,ID,Databases,Storage,Query} from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteprojectid)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content,featuredImage,status,userId}) {
        try {
            const post = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, 
            {
                title,content, featuredImage, status, userId,
            });
            return post;
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    async updatePost(slug,{title, content,featuredImage,status}) {
        try {
            const post = await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            });
            return post;
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.error("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return post;
        } catch (error) {
            console.error("Error getting post:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
            return posts.documents;
        } catch (error) {
            console.error("Error getting posts:", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
            return uploadedFile;
        } catch (error) {
            console.error("Error uploading file:", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Error deleting file:", error);
            return false;
        }
    }

    getFilePreviewUrl(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service