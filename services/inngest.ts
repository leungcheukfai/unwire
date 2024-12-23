import { EventSchemas, Inngest } from "inngest";

type ToolEventData = { slug: string };
type AlternativeEventData = { slug: string };

type Events = {
  "tool.submitted": { data: ToolEventData };
  "tool.expedited": { data: ToolEventData };
  "tool.featured": { data: ToolEventData };
  "tool.scheduled": { data: ToolEventData };
  "tool.published": { data: ToolEventData };
  "tool.deleted": { data: ToolEventData };
  "alternative.created": { data: AlternativeEventData };
  "alternative.deleted": { data: AlternativeEventData };
};

export const inngest = new Inngest({
  id: "openalternative",
  eventKey:
    "yPLsW3vpOsjBfvc7tE9-QEvOQWUck9TZicCTERmC5WmJTrZABe8lTH4z2gk3JOYQZbm6whWmm3aUAOlhYgcLFg",
  schemas: new EventSchemas().fromRecord<Events>(),
});
