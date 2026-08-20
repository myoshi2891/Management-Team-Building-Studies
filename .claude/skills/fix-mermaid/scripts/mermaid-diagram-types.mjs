export const MERMAID_DIAGRAM_TYPES = [
	"graph",
	"flowchart",
	"sequenceDiagram",
	"mindmap",
	"stateDiagram-v2",
	"gitGraph",
	"erDiagram",
	"classDiagram",
	"journey",
	"timeline",
	"pie",
];

export const MERMAID_DIAGRAM_DECLARATION = new RegExp(
	`^(?:(?:%%\\{[\\s\\S]*?\\}%%|%%[^\\n]*)\\s*\\n)*(?:${MERMAID_DIAGRAM_TYPES.join("|")})\\b`,
);
