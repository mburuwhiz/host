import { redirect } from "next/navigation"

export default function TeamSettingsRedirect({ params }: { params: { teamId: string } }) {
  redirect(`/team/${params.teamId}/settings/general`)
}
