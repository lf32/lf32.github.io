import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'lf32';
const GITHUB_API_URL = 'https://api.github.com';

async function fetchGitHubData() {
  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`);
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    const reposData = await reposResponse.json();

    // Calculate total stars
    const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    // Fetch contribution graph data
    const contributionsResponse = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/events/public?per_page=100`);
    const contributionsData = await contributionsResponse.json();

    // Process contributions data
    const contributions = {
      commits: contributionsData.filter(event => event.type === 'PushEvent').length,
      prs: contributionsData.filter(event => event.type === 'PullRequestEvent').length,
      issues: contributionsData.filter(event => event.type === 'IssuesEvent').length,
      forks: contributionsData.filter(event => event.type === 'ForkEvent').length
    };

    // Get recent activity
    const recentActivity = contributionsData
      .slice(0, 5)
      .map(event => {
        let type, text, icon;
        switch (event.type) {
          case 'PushEvent':
            type = 'commit';
            text = `Pushed to ${event.repo.name}`;
            icon = 'GitCommit';
            break;
          case 'PullRequestEvent':
            type = 'pr';
            text = `${event.payload.action} PR in ${event.repo.name}`;
            icon = 'GitPullRequest';
            break;
          case 'ForkEvent':
            type = 'fork';
            text = `Forked ${event.repo.name}`;
            icon = 'GitFork';
            break;
          case 'WatchEvent':
            type = 'star';
            text = `Starred ${event.repo.name}`;
            icon = 'Star';
            break;
          case 'IssuesEvent':
            type = 'issue';
            text = `${event.payload.action} issue in ${event.repo.name}`;
            icon = 'AlertCircle';
            break;
          default:
            return null;
        }
        return {
          type,
          text,
          icon,
          time: new Date(event.created_at).toISOString()
        };
      })
      .filter(Boolean);

    return {
      user: {
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following
      },
      stats: {
        totalStars,
        totalRepos: reposData.length,
        totalForks: reposData.reduce((acc, repo) => acc + repo.forks_count, 0)
      },
      contributions,
      recentActivity
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GitHub API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
} 