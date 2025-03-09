import {Account,Avatars,Client,Databases,ID,Query,Storage,} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.company.VidSense",
  projectId: "67c8930a002d8b4198c8",
  storageId: "67c89827002cfb7a052d",
  databaseId: "67c8951800346f6c7e7e",
  userCollectionId: "67c8955c0002c693ea37",
  videoCollectionId: "67c8957c00098835489d",
};

const client = new Client();

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);
      if (!newAccount) throw new Error("User creation failed");
  
      const avatarUrl = avatars.getInitials(username);
      await signIn(email, password);
  
      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        { email, username, avatar: avatarUrl }
      );
    } catch (error) {
      console.error("User Creation Error:", error);
      throw new Error(error.message || "Unknown error occurred");
    }
  }

export async function signIn(email, password) {
  try {
      return await account.createEmailPasswordSession(email, password);
  } catch (error) {
      console.error("Sign-in Error:", error);
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function getAccount() {
  try {
      return await account.get();
  } catch (error) {
      if (error.message.includes("missing scope")) {
          console.warn("Session expired. Signing out.");
          await signOut();
      }
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function getCurrentUser() {
  try {
      const currentAccount = await getAccount();
      if (!currentAccount) return null;

      const currentUser = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("email", currentAccount.email)]
      );

      return currentUser.documents[0] ?? null;
  } catch (error) {
      console.error("Error fetching user:", error);
      return null;
  }
}

export async function signOut() {
  try {
      return await account.deleteSession("current");
  } catch (error) {
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function uploadFile(file) {
    try {
      if (!file) throw new Error("No file provided");
  
      const blob = await fetch(file.uri).then((res) => res.blob());
  
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        blob
      );
  
      return uploadedFile.$id;
    } catch (error) {
      console.error("File Upload Error:", error);
      throw new Error(error.message || "File upload failed");
    }
  }

export async function getFilePreview(fileId, type) {
  try {
      if (type === "video") {
          return storage.getFileDownload(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        return storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, "top", 100);
      } else {
          throw new Error("Invalid file type");
      }
  } catch (error) {
      console.error("Preview Error:", error);
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function createVideoPost({ title, video, thumbnail, prompt, userId }) {
    try {
      const videoFileId = await uploadFile(video);
      const thumbnailFileId = await uploadFile(thumbnail);
  
      const payload = {
        title,
        videoUrl: videoFileId,
        thumbnailUrl: thumbnailFileId,
        prompt,
        userId,
      };
  
      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        ID.unique(),
        payload
      );
    } catch (error) {
      console.error("Video Upload Error:", error);
      throw new Error(error.message || "Failed to upload video post");
    }
  }

export async function getAllPosts() {
  try {
      const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId);
      return posts.documents ?? [];
  } catch (error) {
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function getUserPosts(userId) {
    if (!userId) return [];
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
        );
        return posts.documents ?? [];
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return [];
    }
}

export async function searchPosts(query) {
  try {
      if (!query.trim()) return [];

      const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          [Query.search("title", query)]
      );

      return posts.documents ?? [];
  } catch (error) {
      console.error("Search Error:", error);
      throw new Error(error.message || "Unknown error occurred");
  }
}

export async function getLatestPosts() {
  try {
      const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(7)]
      );

      return posts.documents ?? [];
  } catch (error) {
      throw new Error(error.message || "Unknown error occurred");
  }
}
