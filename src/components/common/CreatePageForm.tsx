"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { FormReviewCardWrapper } from "./FormReviewCardWrapper";
import { OneImageInput } from "./OneImageInput";
import { Label } from "../ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Required } from "./Required";
import { CreateFormValues, FormType, createFormSchema } from "@/utils/schemas/createFormSchema";
import { createFormAction } from "@/actions/createForm";
import { createFormService } from "@/services/createFormService";

interface CreatePageFormProps {}

const FORM_TYPES = [
  { id: FormType.TEXT, label: "Text" },
  { id: FormType.VIDEO, label: "Video" },
];

// interface FormPage {
//   headlineImgUrl: string;
//   headline: string;
//   customMessage: string;
//   accepts: FormType[];
//   customColor: string;
//   customEndMessage?: string;
//   redirectUrl?: string;
// }

// const formPage: FormPage = {
//   headlineImgUrl: "",
//   headline: "",
//   customMessage: "",
//   accepts: [FormType.TEXT],
//   customColor: "",
//   customEndMessage: "",
//   redirectUrl: "",
// };

export function CreatePageForm({}: CreatePageFormProps) {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      accepts: [FormType.TEXT],
      headline: "Help to improve our product",
      customMessage: "Custom Text",
      customButtonMessage: "Registry review",
      customColor: "#000000",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      createFormService(data);

      // fetch("/api/form", {
      //   method: "POST",
      //   // headers: {
      //   //   "Content-Type": "application/json",
      //   // },
      //   // body: JSON.stringify(data),
      // });
    },
    // (err) => {
    //   console.log("Error:", err);
    // },
  );

  return (
    <div className="mb:pb-16 grid w-full grid-cols-1 items-center justify-center gap-4 pb-0 md:grid-cols-2 md:gap-2">
      <Form {...form}>
        <form className="flex w-full flex-col space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="logoImgFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Logo</FormLabel>

                  <FormControl>
                    <OneImageInput onValueChange={field.onChange} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Headline
                    <Required />
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Help to improve our product" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Custom Text
                    <Required />
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      className="max-h-40"
                      id="text"
                      placeholder="I love this product..."
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customButtonMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Submit button text
                    <Required />
                  </FormLabel>

                  <FormControl>
                    <Input id="buttonText" placeholder="Send" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="customColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submit button text</FormLabel>

                    <FormControl>
                      <Input id="buttonColor" placeholder="Send" type="color" className="w-20" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accepts"
                render={() => (
                  <FormItem>
                    <FormLabel>Review Type</FormLabel>

                    {FORM_TYPES.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="accepts"
                        render={({ field }) => (
                          <FormItem key={item.id} className="flex space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                id={`checkbox-${item.id}`}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                              />
                            </FormControl>

                            <Label className="font-normal" htmlFor={`checkbox-${item.id}`}>
                              {item.label}
                            </Label>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Custom End</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <FormField
                    control={form.control}
                    name="customEndMessage"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Custom End Message</FormLabel>

                        <FormControl>
                          <Input id="customEndMessage" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="redirectUrl"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Redirect Url</FormLabel>

                        <FormControl>
                          <Input id="redirectUrl" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Button disabled={form.formState.isSubmitting}>Create testimonial</Button>
        </form>

        <div className="h-full">
          <FormReviewCardWrapper control={form.control} />
        </div>
      </Form>
    </div>
  );
}
