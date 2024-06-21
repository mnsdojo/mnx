import axios from "axios";
interface GithubRepo {
  name: string;
  stargazers_count: number;
}
export async function getTotalStars(username: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos: GithubRepo[] = await response.data;

    let totalStars = 0;
    repos.forEach((repo) => (totalStars += repo.stargazers_count));
    return totalStars;
  } catch (error: any) {
    console.error("Error fetching data", error.message);
  }
}
