"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Download, Edit, Monitor, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/app/lib/schema";
import useFetch from "@/hooks/use-fetch";
import { saveResume } from "@/actions/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EntryForm } from "./entry-form";
import { entriesToMarkdown } from "@/app/lib/helper";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(()=>{
    if (activeTab === "edit"){
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }

  },[formValues,activeTab])

   const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const onSubmit = async (data) => {};

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold md:text-6xl gradient-title text-5xl">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button variant="destructive">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                  <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+254 117 041 805"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>

                  <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>

                  <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter/X Profile</label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/yourprofile"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>

              </div>
            </div>

             <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({field}) => (
                  <Textarea
                  {...field}
                  className="h-32"
                  placeholder="write a short summary about your professional background and experience."
                  error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                    <p className="text-sm text-red-500">
                      {errors.summary.message}
                    </p>
                  )}
              </div>    

              <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({field}) => (
                  <Textarea
                  {...field}
                  className="h-32"
                  placeholder="write a short summary about your skills."
                  error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                    <p className="text-sm text-red-500">
                      {errors.skills.message}
                    </p>
                  )}
              </div>   

              <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({field}) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                    <p className="text-sm text-red-500">
                      {errors.experience.message}
                    </p>
                  )}
              </div>  

                 <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({field}) => (
                      <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                    <p className="text-sm text-red-500">
                      {errors.education.message}
                    </p>
                  )}
              </div> 

                 <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({field}) => (
                      <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                    <p className="text-sm text-red-500">
                      {errors.projects.message}
                    </p>
                  )}
              </div>   

          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Button variant="link" type="button" 
          onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}
          className="mb-2">
           {resumeMode === "preview" ? (
            <>
             <Edit className="h-4 w-4"/>
            Edit Resume
            </>
           ): (
            <>
              <Monitor className="h-4 w-4"/>
              Show Preview
            </>
           )}
          </Button>
          {resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2"> 
            <AlertTriangle className="h-5 w-5"/>
            <span className="text-sm">
              You will lose edited markdown if you update the form data.
            </span>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
