import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const OnboardingPage = async () => {
  //check if user is already onboarderd 
const { isOnboarded } = await getUserOnboardingStatus()

if (isOnboarded) {
  redirect('/dashboard')
}

  return (
    <main className="">
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage