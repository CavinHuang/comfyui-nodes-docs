
# Documentation
- Class name: VidDirIterator
- Category: cspnodes
- Output node: False

VidDirIterator节点旨在浏览包含视频文件的目录，并根据索引检索视频文件路径。该功能有助于组织和选择指定目录中的视频内容，简化了在各种应用中访问和使用视频文件的过程。

# Input types
## Required
- directory_path
    - 指定包含视频文件的目录路径。此路径对于节点定位和列出视频文件以进行后续操作至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- video_index
    - 确定从目录中排序的视频文件列表中检索视频文件的索引。该索引用于选择特定的视频文件，实现对视频内容的精确访问。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 返回目录中指定索引处视频文件的路径。此输出便于直接访问所选视频文件以进行进一步处理或播放。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VidDirIterator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {}),
                "video_index": ("INT", {"default": 0})
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "get_video_path_by_index"
    CATEGORY = "cspnodes"

    def get_video_path_by_index(self, directory_path, video_index):
        # Get list of video files sorted by modification time (most recent first)
        video_files = sorted(
            [os.path.join(directory_path, f) for f in os.listdir(directory_path)
             if f.lower().endswith(('.mov', '.mp4'))],
            key=lambda x: os.path.getmtime(x),
            reverse=True
        )

        # Wrap the index around using modulo
        video_index = video_index % len(video_files)

        # Return the video file path as a string
        return (video_files[video_index],)

```
