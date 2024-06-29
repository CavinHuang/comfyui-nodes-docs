# Documentation
- Class name: VideoInfoSource
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

该节点旨在提取和提供视频源的基本信息，如每秒帧数、总帧数、持续时间和尺寸。它是理解和进一步处理及分析视频数据的基础特性的重要工具。

# Input types
## Required
- video_info
    - video_info参数是一个包含视频源元数据的结构化对象。它对于节点正确运行和提供准确的视频信息至关重要，因为它直接影响提取的数据和后续分析。
    - Comfy dtype: VHS_VIDEOINFO
    - Python dtype: VHS_VIDEOINFO

# Output types
- fps
    - fps输出代表视频的每秒帧数，这是视频播放和编辑的一个关键参数，影响视频的流畅度和时间分辨率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_count
    - frame_count输出指示视频中的总帧数，这对于视频处理任务如帧提取、动画和基于帧的分析很重要。
    - Comfy dtype: INT
    - Python dtype: int
- duration
    - duration输出提供视频的总时长（秒），这是规划与视频相关的任务和理解内容的时间范围的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - width输出表示视频的水平分辨率，这对于确保视频内容的正确显示和缩放至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height输出代表视频的垂直分辨率，这是在视频处理过程中保持纵横比和视觉质量的重要方面。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class VideoInfoSource:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'video_info': ('VHS_VIDEOINFO',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    RETURN_TYPES = ('FLOAT', 'INT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('fps🟨', 'frame_count🟨', 'duration🟨', 'width🟨', 'height🟨')
    FUNCTION = 'get_video_info'

    def get_video_info(self, video_info):
        keys = ['fps', 'frame_count', 'duration', 'width', 'height']
        source_info = []
        for key in keys:
            source_info.append(video_info[f'source_{key}'])
        return (*source_info,)
```