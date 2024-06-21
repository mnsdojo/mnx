import axios, { type AxiosInstance } from "axios";
interface GithubRepo {
  name: string;
  stargazers_count: number;
}

export class GithubService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
    });
  }

  async getRepoInfo(username: string): Promise<{
    totalRepositories: number;
    followers: number;
    following: number;
    location: string | null;

    bio: string | null;
  }> {
    try {
      const [reposResponse, userResponse] = await Promise.all([
        this.axiosInstance.get(`/users/${username}/repos`),
        this.axiosInstance.get(`/users/${username}`),
      ]);

      const totalRepositories = reposResponse.data.length;
      const { followers, following, location, bio } = userResponse.data;

      return {
        totalRepositories,
        followers,
        following,
        location,
        bio,
      };
    } catch (error: any) {
      console.error("Error fetching data", error.message);
      return {
        totalRepositories: 0,
        followers: 0,

        following: 0,
        location: null,
        bio: null,
      };
    }
  }

  async getTotalStars(username: string): Promise<number> {
    try {
      const response = await this.axiosInstance.get(`/users/${username}/repos`);
      const repos: GithubRepo[] = response.data;

      let totalStars = 0;
      repos.forEach((repo) => (totalStars += repo.stargazers_count));
      return totalStars;
    } catch (error: any) {
      console.error("Error fetching data", error.message);
      return 0;
    }
  }
}

