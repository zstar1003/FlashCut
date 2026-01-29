import EditorClient from "./editor-client";

// 为静态导出生成一个占位路径
// 实际的项目ID由客户端动态处理
export function generateStaticParams() {
  return [{ project_id: "new" }];
}

export default function EditorPage() {
  return <EditorClient />;
}
