import { MediaElement } from "@/types/timeline";
import { useMediaStore } from "@/stores/media-store";
import { useTimelineStore } from "@/stores/timeline-store";
import { PanelBaseView } from "@/components/editor/panel-base-view";
import {
  PropertyItem,
  PropertyItemLabel,
  PropertyItemValue,
} from "./property-item";
import { Switch } from "@/components/ui/switch";
import { formatTimeCode } from "@/lib/time";

export function MediaProperties({ element }: { element: MediaElement }) {
  const { mediaFiles } = useMediaStore();
  const { tracks } = useTimelineStore();

  const mediaFile = mediaFiles.find((file) => file.id === element.mediaId);

  // Find trackId for this element
  const track = tracks.find((t) =>
    t.elements.some((e) => e.id === element.id)
  );
  const trackId = track?.id;

  const handleMutedChange = (muted: boolean) => {
    if (!trackId) return;
    // Use pushHistory and update directly since there's no dedicated method
    const { pushHistory, _tracks } = useTimelineStore.getState();
    pushHistory();
    const newTracks = _tracks.map((t) =>
      t.id === trackId
        ? {
            ...t,
            elements: t.elements.map((e) =>
              e.id === element.id && e.type === "media"
                ? { ...e, muted }
                : e
            ),
          }
        : t
    );
    useTimelineStore.setState({ _tracks: newTracks, tracks: newTracks });
  };

  const effectiveDuration = element.duration - element.trimStart - element.trimEnd;

  return (
    <PanelBaseView className="p-0">
      <div className="space-y-6 p-5">
        <PropertyItem direction="column">
          <PropertyItemLabel>名称</PropertyItemLabel>
          <PropertyItemValue>
            <span className="text-sm">{mediaFile?.name || element.name}</span>
          </PropertyItemValue>
        </PropertyItem>

        <PropertyItem direction="column">
          <PropertyItemLabel>类型</PropertyItemLabel>
          <PropertyItemValue>
            <span className="text-sm">
              {mediaFile?.type === "video"
                ? "视频"
                : mediaFile?.type === "image"
                  ? "图片"
                  : "媒体"}
            </span>
          </PropertyItemValue>
        </PropertyItem>

        {mediaFile?.width && mediaFile?.height && (
          <PropertyItem direction="column">
            <PropertyItemLabel>分辨率</PropertyItemLabel>
            <PropertyItemValue>
              <span className="text-sm">
                {mediaFile.width} × {mediaFile.height}
              </span>
            </PropertyItemValue>
          </PropertyItem>
        )}

        {mediaFile?.fps && (
          <PropertyItem direction="column">
            <PropertyItemLabel>帧率</PropertyItemLabel>
            <PropertyItemValue>
              <span className="text-sm">{mediaFile.fps} FPS</span>
            </PropertyItemValue>
          </PropertyItem>
        )}

        <PropertyItem direction="column">
          <PropertyItemLabel>时长</PropertyItemLabel>
          <PropertyItemValue>
            <span className="text-sm">{formatTimeCode(effectiveDuration, "MM:SS")}</span>
          </PropertyItemValue>
        </PropertyItem>

        {element.trimStart > 0 || element.trimEnd > 0 ? (
          <PropertyItem direction="column">
            <PropertyItemLabel>裁剪</PropertyItemLabel>
            <PropertyItemValue>
              <span className="text-sm text-muted-foreground">
                开头 {formatTimeCode(element.trimStart, "MM:SS")} / 结尾{" "}
                {formatTimeCode(element.trimEnd, "MM:SS")}
              </span>
            </PropertyItemValue>
          </PropertyItem>
        ) : null}

        {mediaFile?.type === "video" && (
          <PropertyItem direction="row">
            <PropertyItemLabel>静音</PropertyItemLabel>
            <PropertyItemValue>
              <Switch
                checked={element.muted ?? false}
                onCheckedChange={handleMutedChange}
              />
            </PropertyItemValue>
          </PropertyItem>
        )}
      </div>
    </PanelBaseView>
  );
}
