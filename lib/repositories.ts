import { slugify } from "@curiousleaf/utils"
import type { Prisma, Tool } from "@prisma/client"
import { differenceInDays, differenceInYears } from "date-fns"
import type { Jsonify } from "inngest/helpers/jsonify"
import { firstCommitQuery, githubClient, repositoryQuery } from "~/services/github"
import type { FirstCommitQueryResult, RepositoryQueryResult } from "~/types/github"

type Repository = {
  owner: string
  name: string
}

/**
 * Extracts the repository owner and name from a GitHub URL.
 *
 * @param url The GitHub URL from which to extract the owner and name.
 * @returns An object containing the repository owner and name, or null if the URL is invalid.
 */
export const getRepoOwnerAndName = (url: string | null): Repository | null => {
  const regex = /github\.com\/(?<owner>[^/]+)\/(?<name>[^/]+)(\/|$)/
  const match = url?.match(regex)

  if (match?.groups?.name) {
    return match.groups as Repository
  }

  return null
}

type GetToolScoreProps = {
  stars: number
  forks: number
  contributors: number
  watchers: number
  lastCommitDate: Date | null
  firstCommitDate: Date
}

/**
 * Calculates a score for a tool based on its GitHub statistics.
 *
 * @param stars - The number of stars the tool has on GitHub.
 * @param forks - The number of forks the tool has on GitHub.
 * @param contributors - The number of contributors to the tool's repository.
 * @param watchers - The number of watchers the tool has on GitHub.
 * @param firstCommitDate - The date of the first commit to the tool's repository.
 * @param lastCommitDate - The date of the last commit to the tool's repository.
 * @param createdAt - The date the repository was created.
 * @returns The calculated score for the tool.
 */
const calculateHealthScore = ({
  stars,
  forks,
  contributors,
  watchers,
  firstCommitDate,
  lastCommitDate,
}: GetToolScoreProps) => {
  const daysSinceLastCommit = lastCommitDate ? differenceInDays(new Date(), lastCommitDate) : 0
  const lastCommitPenalty = Math.min(daysSinceLastCommit, 90) * 0.5

  // Calculate repository age in years
  const ageInYears = differenceInYears(new Date(), firstCommitDate)

  // This factor will be between 0.5 (for very old repos) and 1 (for new repos)
  const ageFactor = 0.5 + 0.5 / (1 + ageInYears / 5)

  const starsScore = stars * 0.25 * ageFactor
  const forksScore = forks * 0.25 * ageFactor
  const watchersScore = watchers * 0.25 * ageFactor
  const contributorsScore = contributors * 0.5 * ageFactor

  return Math.round(starsScore + forksScore + contributorsScore + watchersScore - lastCommitPenalty)
}

const queryRepository = async (repo: Repository) => {
  try {
    const response = await githubClient<RepositoryQueryResult>(repositoryQuery, repo)

    if (!response?.repository) {
      return null
    }

    return response.repository
  } catch (error) {
    console.error(`Failed to fetch repository ${repo.name}: ${error}`)
  }
}

const queryFirstCommit = async (repo: Repository, after: string) => {
  try {
    const response = await githubClient<FirstCommitQueryResult>(firstCommitQuery, {
      ...repo,
      after,
    })

    return response.repository.defaultBranchRef.target.history.nodes[0]?.committedDate
  } catch {}
}

