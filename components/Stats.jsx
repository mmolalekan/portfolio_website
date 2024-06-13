"use client"

import { useEffect, useState } from "react";
import CountUp from "react-countup";
const axios = require('axios');

const Stats = () => {
  const owner = 'mmolalekan';
  const repo = 'IR_institute';
  const [commits, setCommits] = useState(0);

  const getAllRepos = async (username) => {
    let repos = [];
    let page = 1;
    while (true) {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: { per_page: 100, page },
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      repos = repos.concat(response.data);
      if (response.data.length < 100) break;
      page++;
    }
    return repos;
  };

  const getCommitCountForRepo = async (repo) => {
    let commitCount = 0;
    let page = 1;
    while (true) {
      const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/commits`, {
        params: { per_page: 100, page },
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      commitCount += response.data.length;
      if (response.data.length < 100) break;
      page++;
    }
    return commitCount;
  };

  const getTotalCommitCount = async (username) => {
    const repos = await getAllRepos(username);
    let totalCommitCount = 0;

    for (const repo of repos) {
      const commitCount = await getCommitCountForRepo(repo);
      console.log(`Repo: ${repo.name}, Commits: ${commitCount}`);
      totalCommitCount += commitCount;
    }

    return totalCommitCount;
  };

  useEffect(() => {
  getTotalCommitCount(owner)
    .then(totalCommitCount => setCommits(totalCommitCount))
    .catch(error => console.error('Error:', error));
      }, [getTotalCommitCount]);


  const stats = [
    {
      num: 2,
      text: "Years of experience"
    },
    {
      num: 4,
      text: "Projects completed"
    },
    {
      num: 10,
      text: "Technologies mastered"
    },
    {
      num: commits,
      text: "Code commits"
    }
  ]

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start" key={index}>
                <CountUp end={item.num} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold" />
                <p className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats