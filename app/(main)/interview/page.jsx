import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/perfomance-chart';
import QuizList from './_components/quiz-list';

const InterviewPage = async () => {

  const assessments = await getAssessments();

  return (
    <div className="">
      <div className="">
        <h1 className="text-6xl font-bold gradient-title mb-5">Interview Preparation</h1>

        <div className="">
          <StatsCards assessments={assessments} />
          <PerformanceChart assessments={assessments} />
          <QuizList assessments={assessments} />
        </div>
      </div>
    </div>
  )
}

export default InterviewPage