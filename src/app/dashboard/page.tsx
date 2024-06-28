/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { db } from "@/lib/db";
import { ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import moment from "moment";
// import "moment/locale/pt-br";

const Divider = () => <div className="h-px bg-gray-200 dark:bg-gray-700" />;

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await db.form.findMany({
    select: { logoImgUrl: true, name: true, formId: true, createdAt: true },
  });

  return (
    <main>
      <section className="mx-auto max-w-screen-lg space-y-4 pt-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold">Forms</h1>

          <Link href={"/dashboard/create"}>
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              Create Form
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {data.map((form, i) => (
            <Card key={form.formId} className="relative min-w-fit hover:border-gray-300 hover:shadow-md">
              <CardHeader>
                <div className="flex gap-4">
                  <div className="flex aspect-square h-16 w-16 min-w-fit items-center justify-center overflow-hidden rounded-md border-2 border-gray-200 bg-slate-100">
                    <img
                      src={form.logoImgUrl}
                      alt={`form-photo-${i}`}
                      className="h-full w-full select-none object-cover"
                    />
                  </div>

                  <p className="max-w-fit text-ellipsis text-sm font-bold">{form.name}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between">
                  <div className="text-sm">
                    <p>Videos: 0</p>
                    <p>Texts: 0</p>
                  </div>

                  <Link href={`/${form.formId}`} target="_blank">
                    <Button variant={"ghost"} size={"icon"}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

              <CardFooter>
                <p className="text-sm font-light">
                  Created on {moment(new Date(form.createdAt)).format("MMMM, D, YYYY, h:mm A")}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Divider />
      </section>
    </main>
  );
}
